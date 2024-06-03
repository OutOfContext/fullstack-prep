package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Project;
import com.primiq.raffael.backend.model.dao.Team;
import com.primiq.raffael.backend.model.dto.request.project.ProjectCreationRequest;
import com.primiq.raffael.backend.model.dto.request.project.ProjectUpdateRequest;
import com.primiq.raffael.backend.model.repository.ProjectRepository;
import com.primiq.raffael.backend.model.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TeamRepository teamRepository;
    public List<Project> getAllProjects(List<Team> teams) {
        return projectRepository.findAllByTeams(teams);
    }

    public Project createProject(ProjectCreationRequest creationRequest) {
        Long teamId = creationRequest.getTeam();
        Project project = new Project();
        Optional<Team> maybeTeam = teamRepository.findById(teamId);
        maybeTeam.ifPresent(project::setTeam);
        project.setAuthor(creationRequest.getAuthor());
        project.setPath(creationRequest.getPath());
        return projectRepository.save(project);
    }

    public Project updateProject(ProjectUpdateRequest updateRequest) {
        Long id = updateRequest.getId();
        Optional<Project> maybeProject = projectRepository.findById(id);
        return maybeProject.map(projectFound -> {
            projectFound.setPath(updateRequest.getPath());
            projectFound.setAuthor(updateRequest.getAuthor());
            projectRepository.save(projectFound);
            return projectFound;
        }).orElse(null);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
