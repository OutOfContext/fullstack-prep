package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dao.Project;
import com.primiq.raffael.backend.model.dto.ProjectCreationRequest;
import com.primiq.raffael.backend.model.dto.ProjectDeleteRequest;
import com.primiq.raffael.backend.model.dto.ProjectMessage;
import com.primiq.raffael.backend.model.dto.ProjectUpdateRequest;
import com.primiq.raffael.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    @GetMapping
    public ProjectMessage<List<Project>> fetchAllProjects(){
        return ProjectMessage.of(projectService.getAllProjects());
    }

    @PostMapping("/create")
    public ProjectMessage<Project> createNewProject(@RequestBody @NonNull ProjectCreationRequest creationRequest){
        return ProjectMessage.of(projectService.createProject(creationRequest));
    }

    @PutMapping("/update")
    public ProjectMessage<Project> updateProject(@RequestBody ProjectUpdateRequest updateRequest) {
        Project updatedProject = projectService.updateProject(updateRequest);
        if (updatedProject == null) {
            return ProjectMessage.of(null);
        }
        return ProjectMessage.of(updatedProject);
    }

    @DeleteMapping("/remove")
    public ProjectMessage<String> removeProject(@RequestBody ProjectDeleteRequest deleteRequest){
        projectService.deleteProject(deleteRequest.getId());
        return ProjectMessage.of("Project deleted.");
    }
}
