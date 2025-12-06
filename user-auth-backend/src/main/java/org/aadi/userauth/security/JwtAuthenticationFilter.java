package org.aadi.userauth.security;

import org.aadi.userauth.auth.repository.UserRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                if (jwtService.isAccessToken(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                    Jws<io.jsonwebtoken.Claims> jws = jwtService.parse(token);
                    Claims claims = jws.getBody();
                    UUID userId = UUID.fromString(claims.getSubject());
                    userRepository.findById(Objects.requireNonNull(userId)).ifPresent(user -> {
                        List<GrantedAuthority> authorities = user.getRoles() == null ? java.util.List.of()
                                : user.getRoles().stream()
                                .map(r -> new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + r.getName()))
                                .collect(Collectors.toList());
                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                                user.getEmail(), null, authorities
                        );
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    });
                }
            } catch (ExpiredJwtException ex) {
                // Mark for entry point but avoid full stacktrace logging
                request.setAttribute("exception", "token_expired");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            } catch (JwtException ex) {
                request.setAttribute("exception", "invalid_token");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            } catch (Exception ex) {
                throw ex;
            }
        }
        filterChain.doFilter(request, response);
    }


    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String uri = request.getRequestURI();
        // Endpoints that do NOT require authentication and therefore should skip the JWT filter
        return switch (uri) {
            case "/api/v1/auth/login",
                 "/api/v1/auth/register",
                 "/api/v1/auth/refresh",
                 "/api/v1/auth/verify-otp",
                 "/api/v1/auth/forgot-password",
                 "/api/v1/auth/reset-password",
                 "/api/v1/auth/logout" -> true;
            default -> false; // run filter for every other path, including /me and /change-password
        };
    }
}
