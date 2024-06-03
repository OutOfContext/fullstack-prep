package com.primiq.raffael.backend.model.repository;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Organization;
import com.primiq.raffael.backend.model.dao.Team;
import com.primiq.raffael.backend.model.dto.OrganizationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> findByName(String name);

    @Query("select distinct organization from Organization as organization join organization.teams team where team in :teamList ")
    List<Organization> findByTeams(List<Team> teamList);

    @Query("select organization from Organization as organization join organization.teams team join team.users as user where user.id = :userId")
    List<Organization> findAllByUser(Long userId);

    @Query("select organization from Organization as organization where organization.owner.id = :userId")
    List<Organization> findAllByOwner(Long userId);
}
