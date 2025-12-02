package org.aadi.userauth.auth.repository;

import org.aadi.userauth.auth.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByJti(String jti);
}
