package org.aadi.userauth.auth.dto;


/**
 * DTO for updating basic user profile settings (name & mobile). Email cannot be modified.
 */
public record UpdateProfileRequest(
        String name,
        String mobile
) {
}
