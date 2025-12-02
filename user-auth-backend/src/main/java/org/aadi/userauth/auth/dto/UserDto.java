package org.aadi.userauth.auth.dto;

import java.time.Instant;

public record UserDto(
        String name,
        String email,
        boolean enable,
        String image,
        String mobile,
        Instant createdAt,
        Instant updatedAt
) {

}
