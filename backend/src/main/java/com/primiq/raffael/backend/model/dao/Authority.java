package com.primiq.raffael.backend.model.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Data
@NoArgsConstructor
public class Authority implements GrantedAuthority {

    @Id
    private String id;
    @Override
    public String getAuthority() {
        return id;
    }

    public Authority(String id) {
        this.id = id;
    }
}
