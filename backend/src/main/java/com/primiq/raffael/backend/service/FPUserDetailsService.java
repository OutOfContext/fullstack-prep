package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dto.FPUserDetails;
import com.primiq.raffael.backend.model.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
public class FPUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Entering in loadUserByUsername Method...");
        Optional<Account> maybeAccount = accountRepository.findByUsername(username);
        if(maybeAccount.isEmpty()){
            log.error("Username not found: " + username);
            throw new UsernameNotFoundException("User could not be found.");
        }
        log.debug("User Authenticated Successfully..!!!");
        return new FPUserDetails(maybeAccount.get());
    }
}
