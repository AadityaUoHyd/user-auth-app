package org.aadi.userauth.auth.service;

import org.aadi.userauth.auth.dto.RegisterRequest;
import org.aadi.userauth.auth.dto.RegisterResponse;
import org.aadi.userauth.auth.model.Otp;
import org.aadi.userauth.auth.model.Provider;
import org.aadi.userauth.auth.model.User;
import org.aadi.userauth.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    @Value("${app.password.min-length:8}")
    private int minPasswordLength;

    /**
     * Validates password according to security requirements
     */
    public void validatePassword(String password) {
        if (password == null || password.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }
        
        if (password.length() < minPasswordLength) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                String.format("Password must be at least %d characters long", minPasswordLength));
        }
        
        if (!password.matches(".*[A-Z].*")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Password must contain at least one uppercase letter (A-Z)");
        }
        
        if (!password.matches(".*[a-z].*")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Password must contain at least one lowercase letter (a-z)");
        }
        
        if (!password.matches(".*\\d.*")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Password must contain at least one digit (0-9)");
        }
        
        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Password must contain at least one special character (!@#$%^&*()_+-=[]{};':\"\\|,.<>/?)");
        }
    }

    public RegisterResponse register(RegisterRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
        }
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        // Validate password for non-OAuth users
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            validatePassword(request.getPassword());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required for registration");
        }

        String encoded = null;
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            encoded = passwordEncoder.encode(request.getPassword());
        }

        User user = User.builder()
                .email(request.getEmail().trim().toLowerCase())
                .name(request.getName())
                .provider(Provider.LOCAL)
                .password(encoded) // null allowed for OAuth-only users
                .image(request.getImage())
                .mobile(request.getMobile())
                .enabled(true)
                .build();

        User saved = Objects.requireNonNull(userRepository.save(Objects.requireNonNull(user)));
        saved.setEnabled(false); // Disable until OTP verified
        otpService.generateAndSendOtp(saved.getEmail(), Otp.OtpType.REGISTER);
        userRepository.save(Objects.requireNonNull(saved));

        return RegisterResponse.builder()
                .id(saved.getId())
                .email(saved.getEmail())
                .name(saved.getName())
                .image(saved.getImage())
                .mobile(saved.getMobile())
                .enabled(saved.isEnabled())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    // Then, add new method for OTP verification
    public void verifyRegistrationOtp(String email, String otpCode) {
        if (!otpService.verifyOtp(email, otpCode, Otp.OtpType.REGISTER)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired OTP");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }

    // In AuthService.java
    @Transactional
    public void sendResetOtp(String email) {
        log.info("Attempting to send reset OTP to: {}", email);
        try {
            // Always proceed to generate OTP to prevent user enumeration
            otpService.generateAndSendOtp(email, Otp.OtpType.RESET);
            log.info("OTP generated and sent successfully to {}", email);
        } catch (Exception e) {
            log.error("Error sending reset OTP to {}: {}", email, e.getMessage(), e);
            // Don't rethrow to prevent leaking information about user existence
        }
    }

    @Transactional
    public void resetPassword(String email, String otpCode, String newPassword) {
        log.info("Attempting to reset password for email: {}", email);

        try {
            // Verify OTP first
            log.debug("Verifying OTP for email: {}", email);
            if (!otpService.verifyOtp(email, otpCode, Otp.OtpType.RESET)) {
                log.warn("Invalid or expired OTP for email: {}", email);
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid or expired OTP. Please request a new one.");
            }

            // Find user
            log.debug("Looking up user with email: {}", email);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> {
                        log.error("User not found with email: {}", email);
                        return new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found");
                    });

            // Update password
            log.debug("Updating password for user: {}", user.getId());
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            // Invalidate the OTP after successful password reset
            otpService.invalidateOtp(email, otpCode, Otp.OtpType.RESET);
            log.info("Password successfully reset for email: {}", email);

        } catch (ResponseStatusException e) {
            throw e; // Re-throw ResponseStatusException as is
        } catch (Exception e) {
            log.error("Unexpected error resetting password for email: " + email, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to reset password. Please try again.");
        }
    }

}
