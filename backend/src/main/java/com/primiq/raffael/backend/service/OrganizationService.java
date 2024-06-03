package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Organization;
import com.primiq.raffael.backend.model.dto.OrganizationDto;
import com.primiq.raffael.backend.model.dto.request.organization.OrganizationCreationRequest;
import com.primiq.raffael.backend.model.dto.request.organization.OrganizationUpdateRequest;
import com.primiq.raffael.backend.model.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    public OrganizationDto createOrganization(OrganizationCreationRequest organizationCreationRequest, Account owner) {
        String name = organizationCreationRequest.getName();
        Organization organization = new Organization();
        organization.setOwner(owner);
        organization.setName(name);
        Organization updatedOrga = organizationRepository.save(organization);
        return new OrganizationDto(updatedOrga);
    }

    public OrganizationDto updateOrganization(OrganizationUpdateRequest organizationUpdateRequest) {
        Optional<Organization> maybeOrga = organizationRepository.findById(organizationUpdateRequest.getId());
        return maybeOrga.map(orga -> {
            orga.setName(organizationUpdateRequest.getName());
            return new OrganizationDto(organizationRepository.save(orga));
        }).orElseThrow(() -> new RuntimeException("Organization not found."));
    }

    public void deleteOrganization(Long id) {
        organizationRepository.deleteById(id);
    }

    public List<OrganizationDto> getAllOrganizations(Account user) {
        List<OrganizationDto> orgaListByTeamContainsUser = organizationRepository.findAllByUser(user.getId())
                .stream().map(OrganizationDto::new).toList();
        List<OrganizationDto> orgaListByOwner = organizationRepository.findAllByOwner(user.getId())
                .stream().map(OrganizationDto::new).toList();

        return mergeLists(orgaListByTeamContainsUser, orgaListByOwner);
    }

    public Optional<Organization> getOrganization(Long orgaId) {
        return organizationRepository.findById(orgaId);
    }

    public Organization saveOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }

    public static <T> List<T> mergeLists(List<T> list1, List<T> list2) {
        Set<T> set = new HashSet<>(list1);
        set.addAll(list2);
        return new ArrayList<>(set);
    }
}
