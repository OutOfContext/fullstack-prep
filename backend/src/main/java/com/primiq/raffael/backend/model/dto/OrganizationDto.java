package com.primiq.raffael.backend.model.dto;

import com.primiq.raffael.backend.model.dao.Organization;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationDto {

    private Long id;

    private String name;

    private OwnerDto owner;

    private List<TeamDto> teams;

    public OrganizationDto(Organization organization) {
        this.id = organization.getId();
        this.name = organization.getName();
        this.teams = organization.getTeams().stream().map(TeamDto::new).toList();
        this.owner = new OwnerDto(organization.getOwner());
    }
}
