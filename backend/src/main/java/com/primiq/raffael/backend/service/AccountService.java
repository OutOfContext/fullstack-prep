package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Authority;
import com.primiq.raffael.backend.model.dto.AccountDto;
import com.primiq.raffael.backend.model.dto.request.AccountCreationRequest;
import com.primiq.raffael.backend.model.repository.AccountRepository;
import com.primiq.raffael.backend.model.repository.AuthorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final AuthorityRepository authorityRepository;

    public Optional<Account> fetchById(Long id) {
        return accountRepository.findById(id);
    }

    public List<AccountDto> fetchAll() {
        return accountRepository.findAll()
                .stream()
                .map(account -> new AccountDto(account, Collections.emptyList(), Collections.emptyList()))
                .toList();
    }

    public AccountDto createAccount(AccountCreationRequest accountCreationRequest) {
        Optional<Authority> maybeAuthority = authorityRepository.findById("USER");
        return maybeAuthority.map(authority -> {
            Account account = new Account();
            account.setUsername(accountCreationRequest.getUsername());
            account.setPassword(accountCreationRequest.getPassword());
            account.setAuthorities(Set.of(authority));
            try {
                return accountRepository.save(account);
            } catch (DataIntegrityViolationException exception) {
                return null;
            }
        }).map(updatedAccount -> new AccountDto(updatedAccount, Collections.emptyList(), Collections.emptyList()))
                .orElse(null);
    }
}
