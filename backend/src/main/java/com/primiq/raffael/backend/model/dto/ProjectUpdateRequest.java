package com.primiq.raffael.backend.model.dto;

import lombok.Data;

@Data
public class ProjectUpdateRequest {

    private Long id;

    private String author;

    private String path;
}
