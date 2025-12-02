// EmailService.java - New service in org.aadi.userauth.auth.service
package org.aadi.userauth.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;

    @Async
    public void sendOtpEmail(String to, String otp, String purpose) {  // purpose: "Verify your registration" or "Reset your password"
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("User Auth App - " + purpose);
            message.setText("Your OTP is: " + otp + "\nIt expires in 10 minutes.\nDo not share this code.");
            mailSender.send(message);
            log.info("OTP email sent to {}", to);
        } catch (Exception e) {
            log.error("Failed to send OTP email to {}", to, e);
            throw new RuntimeException("Email sending failed", e);
        }
    }
}