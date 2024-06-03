package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Organization;
import com.primiq.raffael.backend.model.dao.Team;
import com.primiq.raffael.backend.model.dto.AuthorityDetails;
import com.primiq.raffael.backend.model.repository.AccountRepository;
import com.primiq.raffael.backend.model.repository.OrganizationRepository;
import com.primiq.raffael.backend.model.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AuthenticationService {

    private final OrganizationRepository organizationRepository;
    private final TeamRepository teamRepository;
    private final AccountRepository accountRepository;
    public AuthorityDetails getAuthorityDetails(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();

        Optional<Account> maybeUser = accountRepository.findByUsername(username);
        return maybeUser.map(user -> {
            List<Team> teams = teamRepository.findTeamsByUsername(user.getUsername());
            List<Organization> organizationList = organizationRepository.findByTeams(teams);
            AuthorityDetails authorityDetails = new AuthorityDetails();
            authorityDetails.setUser(user);
            authorityDetails.setTeams(teams);
            authorityDetails.setOrganizations(organizationList);
            return authorityDetails;
        }).orElse(null);
    }
}
