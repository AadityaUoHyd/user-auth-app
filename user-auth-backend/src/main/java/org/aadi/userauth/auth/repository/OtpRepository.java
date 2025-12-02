// OtpRepository.java - New repo in org.aadi.userauth.auth.repository
package org.aadi.userauth.auth.repository;

import org.aadi.userauth.auth.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface OtpRepository extends JpaRepository<Otp, UUID> {
    Optional<Otp> findByEmailAndCodeAndTypeAndUsedFalse(String email, String code, Otp.OtpType type);

    Optional<Otp> findTopByEmailAndTypeOrderByExpiresAtDesc(String email, Otp.OtpType type);

    void deleteByEmailAndType(String email, Otp.OtpType type); // Clean old OTPs
    // In OtpRepository.java

    @Query("SELECT o FROM Otp o WHERE o.email = :email AND o.type = :type AND o.used = false AND o.expiresAt > CURRENT_TIMESTAMP ORDER BY o.expiresAt DESC")
    List<Otp> findActiveOtpsByEmailAndType(@Param("email") String email, @Param("type") Otp.OtpType type);

    Optional<Otp> findByEmailAndCodeAndType(String email, String code, Otp.OtpType type);
}