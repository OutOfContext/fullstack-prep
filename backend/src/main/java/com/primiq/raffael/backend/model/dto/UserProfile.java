package com.primiq.raffael.backend.model.dto;

import lombok.Data;

@Data
public class UserProfile {

    private AccountDto account;
    private String token;
}
