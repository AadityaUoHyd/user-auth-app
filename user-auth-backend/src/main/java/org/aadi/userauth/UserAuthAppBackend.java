package org.aadi.userauth;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication(scanBasePackages = "org.aadi.userauth")
@ConfigurationPropertiesScan
public class UserAuthAppBackend {

    static {
        Dotenv.configure()
                .ignoreIfMissing()
                .load()
                .entries()
                .forEach(e -> System.setProperty(e.getKey(), e.getValue()));
    }

    public static void main(String[] args) {
        SpringApplication.run(UserAuthAppBackend.class, args);
    }

}
