package com.primiq.raffael.backend.model.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToOne
    private Account owner;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.REMOVE)
    private Set<Team> teams = new HashSet<>(0);

    public void addTeam(Team team) {
        this.teams.add(team);
    }

    public void replaceTeam(Team team) {
        this.teams.removeIf(teamFromList -> teamFromList.getId().equals(team.getId()));
        this.teams.add(team);
    }

    public void removeTeam(Team team){
        this.teams.removeIf(tm -> tm.getId().equals(team.getId()));
    }
}
