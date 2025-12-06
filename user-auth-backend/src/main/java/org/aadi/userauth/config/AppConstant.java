package org.aadi.userauth.config;

public class AppConstant {

    public static final String[] AUTH_PUBLIC_URLS = {
            "/api/v1/auth/login",
            "/api/v1/auth/register", 
            "/api/v1/auth/refresh",
            "/api/v1/auth/verify-otp",
            "/api/v1/auth/forgot-password",
            "/api/v1/auth/reset-password",
            "/api/v1/auth/logout",
            "/actuator/**",
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/swagger-ui/**"
    };

}