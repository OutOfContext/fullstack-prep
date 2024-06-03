package com.primiq.raffael.backend.model.dto.request;

import lombok.Data;

@Data
public class AccountCreationRequest {

    private String username;
    private String password;
}
