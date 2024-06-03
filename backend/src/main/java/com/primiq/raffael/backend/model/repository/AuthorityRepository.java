package com.primiq.raffael.backend.model.repository;

import com.primiq.raffael.backend.model.dao.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
