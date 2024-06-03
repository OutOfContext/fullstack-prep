package com.primiq.raffael.backend.model.repository;

import com.primiq.raffael.backend.model.dao.Project;
import com.primiq.raffael.backend.model.dao.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select project from Project as project join project.team team where team in :teams")
    List<Project> findAllByTeams(List<Team> teams);
}
