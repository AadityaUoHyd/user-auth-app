package org.aadi.userauth.auth.controller;

import lombok.RequiredArgsConstructor;
import org.aadi.userauth.auth.model.User;
import org.aadi.userauth.auth.repository.RefreshTokenRepository;
import org.aadi.userauth.auth.repository.UserRepository;
import org.springframework.http.HttpStatus;
import java.util.Objects;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import jakarta.servlet.http.HttpServletResponse;
import org.aadi.userauth.auth.service.CookieService;

import java.security.Principal;
import java.util.Map;

/**
 * Handles destructive account-level actions for the currently authenticated user.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AccountController {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieService cookieService;

    /**
     * Permanently delete the current user account together with its refresh tokens.
     * Returns 204 No-Content on success.
     */
    @DeleteMapping("/delete-account")
    @Transactional
    public ResponseEntity<Map<String, String>> deleteCurrentAccount(Principal principal, HttpServletResponse response) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Clean refresh tokens
        refreshTokenRepository.deleteByUser(user);

        // Delete user
        userRepository.delete(Objects.requireNonNull(user));

        SecurityContextHolder.clearContext();

        // Clear refresh cookie so client stops sending it
        cookieService.clearRefreshCookie(response);

        return ResponseEntity.ok(Map.of("message", "Account deleted"));
    }
}
