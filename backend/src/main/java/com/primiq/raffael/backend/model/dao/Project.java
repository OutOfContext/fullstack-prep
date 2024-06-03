package com.primiq.raffael.backend.model.dao;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;

    private String path;

    @ManyToOne
    private Team team;

}
