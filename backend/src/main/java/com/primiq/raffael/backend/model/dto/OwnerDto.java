package com.primiq.raffael.backend.model.dto;

import com.primiq.raffael.backend.model.dao.Account;
import lombok.Data;

@Data
public class OwnerDto {

    private Long id;
    private String name;
    public OwnerDto(Account owner) {
        this.id = owner.getId();
        this.name = owner.getUsername();
    }
}
