package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Organization;
import com.primiq.raffael.backend.model.dao.Team;
import com.primiq.raffael.backend.model.dto.AuthorityDetails;
import com.primiq.raffael.backend.model.dto.Message;
import com.primiq.raffael.backend.model.dto.OrganizationDto;
import com.primiq.raffael.backend.model.dto.TeamDto;
import com.primiq.raffael.backend.model.dto.request.organization.OrganizationCreationRequest;
import com.primiq.raffael.backend.model.dto.request.organization.OrganizationDeleteRequest;
import com.primiq.raffael.backend.model.dto.request.organization.OrganizationUpdateRequest;
import com.primiq.raffael.backend.model.dto.request.team.TeamAddRequest;
import com.primiq.raffael.backend.model.dto.request.team.TeamDeleteRequest;
import com.primiq.raffael.backend.model.dto.request.team.TeamUpdateRequest;
import com.primiq.raffael.backend.service.AuthenticationService;
import com.primiq.raffael.backend.service.OrganizationService;
import com.primiq.raffael.backend.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;
    private final TeamService teamService;
    private final AuthenticationService authenticationService;

    @GetMapping
    public Message<List<OrganizationDto>> fetchOrganizations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthorityDetails details = authenticationService.getAuthorityDetails(authentication);
        if (details == null){
            return Message.of(Collections.emptyList());
        }

        Account user = details.getUser();
        List<OrganizationDto> organizations = organizationService.getAllOrganizations(user);
        return Message.of(organizations);
    }
    @PostMapping("/create")
    public Message<OrganizationDto> createOrganization(@RequestBody OrganizationCreationRequest organizationCreationRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthorityDetails details = authenticationService.getAuthorityDetails(authentication);
        if (details == null){
            return Message.of(null);
        }
        Account owner = details.getUser();
        OrganizationDto organization;
        try {
            organization = organizationService.createOrganization(organizationCreationRequest, owner);
        } catch (Exception exception) {
            return Message.of(null, HttpStatus.CONFLICT);
        }
        return Message.of(organization);
    }

    @PutMapping("/update")
    public Message<OrganizationDto> updateOrganization(@RequestBody OrganizationUpdateRequest organizationUpdateRequest){
        OrganizationDto organization = organizationService.updateOrganization(organizationUpdateRequest);
        return Message.of(organization);
    }

    @DeleteMapping("/remove")
    public Message<String> deleteOrganization(@RequestBody OrganizationDeleteRequest organizationDeleteRequest){
        organizationService.deleteOrganization(organizationDeleteRequest.getId());
        return Message.of("Organization deleted.");
    }

    @PostMapping("/{orgaId}/teams/add")
    public Message<TeamDto> addTeamToOrganization(@RequestBody TeamAddRequest teamAddRequest, @PathVariable String orgaId) {
        Optional<Organization> maybeOrganization = organizationService.getOrganization(Long.valueOf(orgaId));
        return maybeOrganization.map(organization -> {
            Team team = teamService.createTeam(teamAddRequest);
            organization.addTeam(team);
            organizationService.saveOrganization(organization);
            return Message.of(new TeamDto(team));
        }).orElse(Message.of(null));
    }

    @PutMapping("/{orgaId}/teams/update")
    public Message<TeamDto> updateTeamInOrganization(@RequestBody TeamUpdateRequest teamUpdateRequest, @PathVariable String orgaId) {
        Optional<Organization> maybeOrganization = organizationService.getOrganization(Long.valueOf(orgaId));
        return maybeOrganization.map(organization -> {
            Team team = teamService.updateTeam(teamUpdateRequest);
            organization.replaceTeam(team);
            organizationService.saveOrganization(organization);
            return Message.of(new TeamDto(team));
        }).orElse(Message.of(null));
    }

    @DeleteMapping("/{orgaId}/teams/remove")
    public Message<String> deleteTeamFromOrganization(@RequestBody TeamDeleteRequest teamDeleteRequest, @PathVariable String orgaId) {
        Optional<Organization> maybeOrganization = organizationService.getOrganization(Long.valueOf(orgaId));
        return maybeOrganization.map(organization -> {
            Team team = teamService.deleteTeam(teamDeleteRequest);
            organization.removeTeam(team);
            organizationService.saveOrganization(organization);
            return Message.of("Team deleted successfully.");
        }).orElse(Message.of(null));
    }
}
