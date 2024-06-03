package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dto.AccountDto;
import com.primiq.raffael.backend.model.dto.AuthorityDetails;
import com.primiq.raffael.backend.model.dto.Message;
import com.primiq.raffael.backend.model.dto.request.AccountCreationRequest;
import com.primiq.raffael.backend.service.AccountService;
import com.primiq.raffael.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AuthenticationService authenticationService;
    @GetMapping
    public Message<List<AccountDto>> fetchAllAccounts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthorityDetails details = authenticationService.getAuthorityDetails(authentication);
        if (details == null){
            return Message.of(Collections.emptyList());
        }
        return Message.of(accountService.fetchAll());
    }

}
