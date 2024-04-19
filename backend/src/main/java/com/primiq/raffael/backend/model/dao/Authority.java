package com.primiq.raffael.backend.model.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Data
public class Authority implements GrantedAuthority {

    @Id
    private String id;
    @Override
    public String getAuthority() {
        return id;
    }
}
