package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Authority;
import com.primiq.raffael.backend.model.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class InitService implements ApplicationListener<ApplicationStartedEvent> {

    private final AccountRepository accountRepository;

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        if (accountRepository.count() == 0) {
            Account account = new Account();
            account.setUsername("admin");
            account.setPassword("nimda");

            Authority authority = new Authority();
            authority.setId("ADMIN");
            account.setAuthorities(List.of(authority));
            Account saved = accountRepository.save(account);
            log.info("Account {} was created.", saved);
        }
        else {
            log.info("One Account already exists.");
        }
    }
}
