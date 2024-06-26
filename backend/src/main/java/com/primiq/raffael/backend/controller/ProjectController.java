package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dao.Project;
import com.primiq.raffael.backend.model.dao.Team;
import com.primiq.raffael.backend.model.dto.AuthorityDetails;
import com.primiq.raffael.backend.model.dto.request.project.ProjectCreationRequest;
import com.primiq.raffael.backend.model.dto.request.project.ProjectDeleteRequest;
import com.primiq.raffael.backend.model.dto.Message;
import com.primiq.raffael.backend.model.dto.request.project.ProjectUpdateRequest;
import com.primiq.raffael.backend.service.AuthenticationService;
import com.primiq.raffael.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final AuthenticationService authenticationService;
    @GetMapping
    public Message<List<Project>> fetchAllProjects(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthorityDetails details = authenticationService.getAuthorityDetails(authentication);
        if (details == null){
            return Message.of(Collections.emptyList());
        }
        List<Team> teams = details.getTeams();
        return Message.of(projectService.getAllProjects(teams));
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
