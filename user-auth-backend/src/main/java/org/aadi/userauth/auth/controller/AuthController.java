package org.aadi.userauth.auth.controller;

import lombok.extern.slf4j.Slf4j;
import org.aadi.userauth.auth.dto.*;
import org.aadi.userauth.auth.model.RefreshToken;
import org.aadi.userauth.auth.model.User;
import org.aadi.userauth.auth.repository.RefreshTokenRepository;
import org.aadi.userauth.auth.repository.UserRepository;
import org.aadi.userauth.auth.service.AuthService;
import org.aadi.userauth.auth.service.CookieService;
import org.aadi.userauth.security.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final AuthService authService;
    private final CookieService cookieService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {

        Authentication authentication = authenticate(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        if (user.getPassword() == null) {
            throw new BadCredentialsException("Password login is not available for this account");
        }
        if (!user.isEnabled()) {
            throw new DisabledException("User is disabled");
        }
        String jti = UUID.randomUUID().toString();
        RefreshToken rt = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .revoked(false)
                .build();
        refreshTokenRepository.save(Objects.requireNonNull(rt));

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, jti);

        // Use CookieUtil (same behavior)
        cookieService.attachRefreshCookie(response, refreshToken, (int) jwtService.getRefreshTtlSeconds());
        cookieService.addNoStoreHeaders(response);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(TokenResponse.bearerWithUser(accessToken, refreshToken, 900,
                        new UserDto(user.getName(), user.getEmail(), user.isEnabled(), user.getImage(),
                                user.getMobile(), user.getCreatedAt(), user.getUpdatedAt())));
    }

    private Authentication authenticate(LoginRequest request) {
        try {
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid username or password !!");
        }
    }

    @PostMapping("/refresh")
    @Transactional
    public ResponseEntity<TokenResponse> refresh(
            @RequestBody(required = false) RefreshTokenRequest body,
            HttpServletRequest request,
            HttpServletResponse response) {
        String token = readRefreshTokenFromRequest(body, request)
                .orElseThrow(() -> new BadCredentialsException("Refresh token missing"));

        if (!jwtService.isRefreshToken(token)) {
            throw new BadCredentialsException("Invalid token type");
        }

        String jti = jwtService.getJti(token);
        UUID userId = jwtService.getUserId(token);

        RefreshToken stored = refreshTokenRepository.findByJti(jti)
                .orElseThrow(() -> new BadCredentialsException("Refresh token not recognized"));

        if (stored.isRevoked() || stored.getExpiresAt().isBefore(Instant.now())) {
            throw new CredentialsExpiredException("Refresh token expired or revoked");
        }
        if (!stored.getUser().getId().equals(userId)) {
            throw new BadCredentialsException("Token subject mismatch");
        }

        // Rotate
        stored.setRevoked(true);
        String newJti = UUID.randomUUID().toString();
        stored.setReplacedByToken(newJti);
        refreshTokenRepository.save(Objects.requireNonNull(stored));

        User user = stored.getUser();
        RefreshToken newRt = RefreshToken.builder()
                .jti(newJti)
                .user(user)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .revoked(false)
                .build();
        refreshTokenRepository.save(Objects.requireNonNull(newRt));

        String newAccess = jwtService.generateAccessToken(user);
        String newRefresh = jwtService.generateRefreshToken(user, newJti);

        // Use CookieUtil (same behavior)
        cookieService.attachRefreshCookie(response, newRefresh, (int) jwtService.getRefreshTtlSeconds());
        cookieService.addNoStoreHeaders(response);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + newAccess)
                .body(TokenResponse.bearer(newAccess, newRefresh, 900));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        readRefreshTokenFromRequest(null, request).ifPresent(token -> {
            try {
                if (jwtService.isRefreshToken(token)) {
                    String jti = jwtService.getJti(token);
                    refreshTokenRepository.findByJti(jti).ifPresent(rt -> {
                        rt.setRevoked(true);
                        refreshTokenRepository.save(Objects.requireNonNull(rt));
                    });
                }
            } catch (JwtException ignored) {
            }
        });

        // Use CookieUtil (same behavior)
        cookieService.clearRefreshCookie(response);
        cookieService.addNoStoreHeaders(response);
        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private Optional<String> readRefreshTokenFromRequest(RefreshTokenRequest body, HttpServletRequest request) {
        // 1) Prefer secure HttpOnly cookie
        if (request.getCookies() != null) {
            Optional<String> fromCookie = Arrays.stream(request.getCookies())
                    .filter(c -> cookieService.getRefreshCookieName().equals(c.getName())) // <-- use util name
                    .map(Cookie::getValue)
                    .filter(v -> v != null && !v.isBlank())
                    .findFirst();
            if (fromCookie.isPresent()) {
                return fromCookie;
            }
        }

        // 2) Body
        if (body != null && body.refreshToken() != null && !body.refreshToken().isBlank()) {
            return Optional.of(body.refreshToken().trim());
        }

        // 3) Custom header
        String refreshHeader = request.getHeader("X-Refresh-Token");
        if (refreshHeader != null && !refreshHeader.isBlank()) {
            return Optional.of(refreshHeader.trim());
        }

        // 4) Authorization: Bearer <token> (only if actually refresh)
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.regionMatches(true, 0, "Bearer ", 0, 7)) {
            String candidate = authHeader.substring(7).trim();
            if (!candidate.isEmpty()) {
                try {
                    if (jwtService.isRefreshToken(candidate)) {
                        return Optional.of(candidate);
                    }
                } catch (Exception ignored) {
                }
            }
        }

        return Optional.empty();
    }

    @GetMapping("/me")
    public User getCurrentUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("You are not loggedIn"));
    }

    // Update AuthController.java - Add new endpoints
    @PostMapping("/verify-otp")
    public ResponseEntity<Void> verifyRegistration(@RequestBody VerifyOtpRequest request) {
        authService.verifyRegistrationOtp(request.email(), request.otp());
        return ResponseEntity.ok().build();
    }

    // In AuthController.java
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            authService.sendResetOtp(request.email());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error in forgot password for email: {}", request.email(), e);
            // Return success even on error to prevent email enumeration
            return ResponseEntity.ok().build();
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            authService.resetPassword(
                    request.email(),
                    request.otp(),
                    request.newPassword());
            return ResponseEntity.ok().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(Map.of("message", e.getReason()));
        } catch (Exception e) {
            log.error("Error resetting password for email: {}", request.email(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to reset password. Please try again."));
        }
    }

    // For profile change password (requires old password)
    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest request, Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        log.info("Change password request for principal: {}", principal.getName());
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        log.info("User found: {} with password hash: {}", user.getEmail(),
                user.getPassword() != null ? user.getPassword().substring(0, 10) + "..." : "null");
        if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
            log.warn("Password mismatch for user: {}", user.getEmail());
            throw new BadCredentialsException("Old password incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.saveAndFlush(user);
        log.info("Password updated for user: {}", user.getEmail());
        return ResponseEntity.ok().build();
    }

}