// OtpService.java - New service in org.aadi.userauth.auth.service
package org.aadi.userauth.auth.service;

import org.aadi.userauth.auth.model.Otp;
import org.aadi.userauth.auth.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OtpService {
    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRY_MINUTES = 10;

    public String generateAndSendOtp(String email, Otp.OtpType type) {
        // Clean old OTPs for this email/type
        otpRepository.deleteByEmailAndType(email, type);

        // Generate OTP
        String otp = generateOtp();
        Instant expiresAt = Instant.now().plus(OTP_EXPIRY_MINUTES, ChronoUnit.MINUTES);

        // Save OTP
        Otp savedOtp = Otp.builder()
                .email(email)
                .code(otp)
                .expiresAt(expiresAt)
                .type(type)
                .used(false)
                .build();
        otpRepository.save(Objects.requireNonNull(savedOtp));

        // Send email
        String purpose = type == Otp.OtpType.REGISTER ? "Verify your email" : "Reset your password";
        emailService.sendOtpEmail(email, otp, purpose);

        return otp; // For testing; remove in prod
    }

    public boolean verifyOtp(String email, String code, Otp.OtpType type) {
        log.info("Verifying OTP for email: {}, code: {}, type: {}", email, code, type);
        Optional<Otp> otpOpt = otpRepository.findByEmailAndCodeAndTypeAndUsedFalse(email, code, type);
        
        if (otpOpt.isEmpty()) {
            log.warn("No active OTP found for email: {} and type: {}", email, type);
            return false;
        }
        
        Otp otp = otpOpt.get();
        log.info("Found OTP: id={}, email={}, expiresAt={}, used={}", 
            otp.getId(), otp.getEmail(), otp.getExpiresAt(), otp.isUsed());
        
        if (otp.getExpiresAt().isBefore(Instant.now())) {
            log.warn("OTP expired at {}", otp.getExpiresAt());
            return false;
        }
        
        otp.setUsed(true);
        otpRepository.save(otp);
        log.info("OTP verified and marked as used");
        return true;
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    @Transactional
public void invalidateOtp(String email, String code, Otp.OtpType type) {
    log.debug("Invalidating OTP for email: {}, type: {}", email, type);
    otpRepository.findByEmailAndCodeAndType(email, code, type)
        .ifPresent(otp -> {
            otp.setUsed(true);
            otpRepository.save(otp);
            log.debug("Marked OTP as used for email: {}", email);
        });
}
}