package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dto.AccountDto;
import com.primiq.raffael.backend.model.dto.Message;
import com.primiq.raffael.backend.model.dto.request.AccountCreationRequest;
import com.primiq.raffael.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegisterController {

    private final AccountService accountService;
    @PostMapping
    public Message<AccountDto> registerAccount(@RequestBody AccountCreationRequest accountCreationRequest){
        AccountDto account = accountService.createAccount(accountCreationRequest);
        return Message.of(account);
    }
}
