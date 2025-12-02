package org.aadi.userauth.security;

import org.aadi.userauth.auth.model.User;
import org.aadi.userauth.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository users;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> maybeUser = users.findByEmail(email);
        User user = maybeUser.orElseThrow(() -> new UsernameNotFoundException("User not found with this email id:"));
        Collection<SimpleGrantedAuthority> authorities = (user.getRoles() == null ? java.util.List.<SimpleGrantedAuthority>of()
                : user.getRoles().stream()
                    .map(r -> new SimpleGrantedAuthority("ROLE_" + r.getName()))
                    .collect(Collectors.toList()));
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword() == null ? "" : user.getPassword())
                .authorities(authorities)
                .disabled(!user.isEnabled())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .build();
    }
}
