package com.primiq.raffael.backend.model.repository;

import com.primiq.raffael.backend.model.dao.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByName(String name);

    @Query("select team from Team as team join team.users users where users.username = :username")
    List<Team> findTeamsByUsername(String username);
}
