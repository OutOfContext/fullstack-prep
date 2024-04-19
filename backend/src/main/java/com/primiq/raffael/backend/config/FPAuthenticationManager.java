package com.primiq.raffael.backend.config;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.repository.AccountRepository;
import com.primiq.raffael.backend.service.FPUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class FPAuthenticationManager implements AuthenticationManager {

    private final AccountRepository accountRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        // Benutzer aus der Datenbank abrufen (Annahme: Du verwendest eine Benutzerdatenbank)
        Optional<Account> maybeAccount = accountRepository.findByUsername(username);
        UserDetails user = maybeAccount.map(account -> {
            if (!password.equals(account.getPassword())) {
                return null;
            }
            return User.builder()
                    .username(account.getUsername())
                    .password(account.getPassword())
                    .authorities(account.getAuthorities())
                    .build();
        }).orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        // Wenn die Anmeldeinformationen gültig sind, erstelle und gib ein authentifiziertes Authentication-Objekt zurück
        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }
}
