package com.primiq.raffael.backend.model.dto;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Authority;
import com.primiq.raffael.backend.model.dao.Organization;
import com.primiq.raffael.backend.model.dao.Team;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class AccountDto {

    private Long id;

    private String username;

    private Set<Authority> authorities;

    private List<TeamDto> teams;

    private List<OrganizationDto> organizations;

    public AccountDto(Account user, List<Team> teams, List<Organization> organizations) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.authorities = user.getAuthorities();
        this.teams = teams.stream().map(TeamDto::new).toList();
        this.organizations = organizations.stream().map(OrganizationDto::new).toList();
    }
}
