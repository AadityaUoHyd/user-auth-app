package org.aadi.userauth.config;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "User Auth App API",
        description = """
            A comprehensive authentication and authorization built with Spring Boot 3.5.7.
            
            Features:
            • JWT-based authentication with access/refresh tokens
            • Email/password login with secure password storage
            • OAuth2 integration (Google & GitHub)
            • Email verification via OTP (SMTP)
            • Password reset & change functionality
            • User profile management
            
            This service can be integrated as a plugin into any application requiring user authentication.
            """,
        contact = @Contact(
            name = "Aaditya B Chatterjee", 
            email = "aadityabchatterjee@example.com", 
            url = "https://abchatterjee.netlify.app"
        ),
        version = "1.0.0",
        license = @License(
            name = "MIT License", 
            url = "https://github.com/AadityaUoHyd/user-auth-app/blob/main/LICENSE.md"
        ),
        summary = "Full-stack authentication with JWT, OAuth2, and email verification"
    ),
    security = @SecurityRequirement(name = "bearerAuth")
)
@SecurityScheme(
    name = "bearerAuth",
    description = "JWT Bearer Token Authentication. Include 'Authorization: Bearer <access_token>' header for protected endpoints.",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT"
)
public class ApiDocConfig {
    
}
