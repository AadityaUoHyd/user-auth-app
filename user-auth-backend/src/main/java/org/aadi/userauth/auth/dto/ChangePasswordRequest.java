package org.aadi.userauth.auth.dto;

public record ChangePasswordRequest(String oldPassword, String newPassword) {}
