package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dao.Project;
import com.primiq.raffael.backend.model.dto.request.ProjectCreationRequest;
import com.primiq.raffael.backend.model.dto.request.ProjectDeleteRequest;
import com.primiq.raffael.backend.model.dto.Message;
import com.primiq.raffael.backend.model.dto.request.ProjectUpdateRequest;
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
    public Message<List<Project>> fetchAllProjects(){
        return Message.of(projectService.getAllProjects());
    }

    @PostMapping("/create")
    public Message<Project> createNewProject(@RequestBody @NonNull ProjectCreationRequest creationRequest){
        return Message.of(projectService.createProject(creationRequest));
    }

    @PutMapping("/update")
    public Message<Project> updateProject(@RequestBody ProjectUpdateRequest updateRequest) {
        Project updatedProject = projectService.updateProject(updateRequest);
        if (updatedProject == null) {
            return Message.of(null);
        }
        return Message.of(updatedProject);
    }

    @DeleteMapping("/remove")
    public Message<String> removeProject(@RequestBody ProjectDeleteRequest deleteRequest){
        projectService.deleteProject(deleteRequest.getId());
        return Message.of("Project deleted.");
    }
}
