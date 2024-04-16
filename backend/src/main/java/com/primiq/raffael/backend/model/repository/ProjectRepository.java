package com.primiq.raffael.backend.model.repository;

import com.primiq.raffael.backend.model.dao.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
