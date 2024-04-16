package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Project;
import com.primiq.raffael.backend.model.dto.ProjectCreationRequest;
import com.primiq.raffael.backend.model.dto.ProjectUpdateRequest;
import com.primiq.raffael.backend.model.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(ProjectCreationRequest creationRequest) {
        Project project = new Project();
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
