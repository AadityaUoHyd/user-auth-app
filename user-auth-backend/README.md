# user-auth-backend
Backend part of User Auth App. Built in Springboot, a framework of Java, along with maven. 
It uses PostgreSQL as db, JWT, OAuth2, lombok, model-mapper etc.

## How to run this Springboot Backend
Ensure you have .env file with 
``` 
# ===========================
# JWT CONFIG
# ===========================
JWT_SECRET=9f5c7ab12e0d8bcf3a1e76cd04f9b82c6ef13b02ff56a7c91d9c4b45e60bd8a1
JWT_ISSUER=auth-backend
JWT_ACCESS_TTL_SECONDS=300
JWT_REFRESH_TTL_SECONDS=2592000
JWT_REFRESH_COOKIE_NAME=refresh_token
JWT_COOKIE_SECURE=true
JWT_COOKIE_SAME_SITE=Lax

# ===========================
# DATABASE CONFIG (POSTGRES / NEON DUMMY EXAMPLE)
# ===========================
DB_URL=jdbc:postgresql://ep-demo-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
DB_USERNAME=demo_user
DB_PASSWORD=demo_password_123

# ===========================
# OAUTH2 GITHUB
# ===========================
GITHUB_CLIENT_ID=gh_dummy_client_id_123456
GITHUB_CLIENT_SECRET=gh_dummy_client_secret_abcdef123456

# ===========================
# OAUTH2 GOOGLE
# ===========================
GOOGLE_CLIENT_ID=google_dummy_client_id_123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=google_dummy_client_secret_abcdef123456

# ===========================
# APP CORS / REDIRECTS
# ===========================
ALLOWED_ORIGINS=http://localhost:5173
AUTH_SUCCESS_REDIRECT=http://localhost:5173/auth/success
AUTH_FAILURE_REDIRECT=http://localhost:5173/auth/failure


# ================================
# SET MINIMUM LENGTH FOR PASSWORD
# ================================
APP_PASSWORD_MIN_LENGTH=8

# ===========================
# MAILING SERVICE
# ===========================
MAIL_USERNAME=aadityaraj.raj402@gmail.com
MAIL_PASSWORD=yfydlqypkyrwsgco

```

- Either run using IDE OR go to root of backend project folder and run at command line =>
```
mvn spring-boot:run
```