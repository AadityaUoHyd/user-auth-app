// Otp.java - New entity in org.aadi.userauth.auth.model
package org.aadi.userauth.auth.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "otps", indexes = {
        @Index(name = "idx_otp_email_type", columnList = "email, type"),
        @Index(name = "idx_otp_expiry", columnList = "expiresAt")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Otp {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, length = 6)
    private String code;

    @Column(nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    @Builder.Default
    private boolean used = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OtpType type; // REGISTER, RESET

    public enum OtpType {
        REGISTER, RESET
    }
}
