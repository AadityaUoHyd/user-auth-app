package org.aadi.userauth.auth.dto;

public record ResetPasswordRequest(String email, String otp, String newPassword) {}

