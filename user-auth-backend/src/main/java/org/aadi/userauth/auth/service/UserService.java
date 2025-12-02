package org.aadi.userauth.auth.service;

import org.aadi.userauth.auth.model.Provider;
import org.aadi.userauth.auth.model.User;
import org.aadi.userauth.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;


    public User saveUserIfNotExit(String providerId, String email, String username, String image, Provider provider) {


        User user = userRepository.findByEmail(email).orElseGet(() -> {
            return User.builder()
                    .providerId(providerId)
                    .email(email)
                    .name(username)
                    .provider(provider)
                    .image(image)
                    .password("")
                    .enabled(true)
                    .build();
        });
        return userRepository.save(user);


    }

}
