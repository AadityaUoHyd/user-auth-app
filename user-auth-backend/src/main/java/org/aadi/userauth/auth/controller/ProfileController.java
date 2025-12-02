package org.aadi.userauth.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.aadi.userauth.auth.dto.UpdateProfileRequest;
import org.aadi.userauth.auth.dto.UserDto;
import org.aadi.userauth.auth.model.User;
import org.aadi.userauth.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Objects;

/**
 * Controller dedicated to profile-related endpoints (name, mobile, etc.).
 * Base path kept "/api/v1/auth" so it matches the existing frontend call.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class ProfileController {

    private static final Logger log = LoggerFactory.getLogger(ProfileController.class);

    private final UserRepository userRepository;

    @PutMapping("/update-user-profile")
    public ResponseEntity<UserDto> updateUserProfile(@Valid @RequestBody UpdateProfileRequest request,
                                                     Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }

        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        log.info("Updating profile for user: {}", email);
        if (request.name() != null && !request.name().isBlank()) {
            user.setName(request.name().trim());
        }
        if (request.mobile() != null && !request.mobile().isBlank()) {
            user.setMobile(request.mobile().trim());
        }
        userRepository.save(Objects.requireNonNull(user));

        UserDto dto = new UserDto(
                user.getName(),
                user.getEmail(),
                user.isEnabled(),
                user.getImage(),
                user.getMobile(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
        return ResponseEntity.ok(dto);
    }
}
