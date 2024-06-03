package com.primiq.raffael.backend.model.dto.request.project;

import lombok.Data;

@Data
public class ProjectCreationRequest {

    private String author;

    private String path;

    private Long team;
}
