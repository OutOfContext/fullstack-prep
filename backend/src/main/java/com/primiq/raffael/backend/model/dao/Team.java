package com.primiq.raffael.backend.model.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "team", fetch = FetchType.EAGER)
    private Set<Account> users = new HashSet<>(0);

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
    public Team(Long id) {
        this.id = id;
    }

    public void addUserToTeam(Account account){
        this.users.add(account);
    }

    public void removeUserFromTeam(Account account){
        this.users.removeIf(acc -> acc.getId().equals(account.getId()));
    }

}
