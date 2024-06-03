package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Authority;
import com.primiq.raffael.backend.model.dao.Organization;
import com.primiq.raffael.backend.model.dao.Team;
import com.primiq.raffael.backend.model.repository.AccountRepository;
import com.primiq.raffael.backend.model.repository.AuthorityRepository;
import com.primiq.raffael.backend.model.repository.OrganizationRepository;
import com.primiq.raffael.backend.model.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

@Component
@RequiredArgsConstructor
@Slf4j
public class InitService implements ApplicationListener<ApplicationStartedEvent> {

    private final AccountRepository accountRepository;
    private final OrganizationRepository organizationRepository;
    private final TeamRepository teamRepository;
    private final AuthorityRepository authorityRepository;
    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        createAuthorities(List.of("USER","ADMIN","SYSTEM"));
        Account account = createAccount("admin","nimda");
        Team team = createTeam();
        Organization organization = createOrganization();

        if (account.getAuthorities().isEmpty()) {
            authorityRepository
                    .findById("ADMIN")
                    .ifPresent(authority -> {
                        Account updatedAccount = updateAccount(account, authority);
                        log.info("Account {} updated.", updatedAccount);
                    });
        }

        if (team.getUsers().isEmpty()) {
            team.addUserToTeam(account);
            Team updatedTeam = teamRepository.save(team);
            log.info("Team {} updated.", updatedTeam);
        }

        if (organization.getTeams().isEmpty()) {
            organization.addTeam(team);
            organization.setOwner(account);
            Organization updatedOrga = organizationRepository.save(organization);
            log.info("Organization {} updated", updatedOrga);
        }

    }

    private Account updateAccount(Account account, Authority authority){
        account.addAuthority(authority);
        return accountRepository.save(account);
    }

    private void createAuthorities(List<String> inputs) {
        for (String input : inputs) {
            if(!authorityRepository.existsById(input)){
                Authority authority = new Authority(input);
                Authority savedAuth = authorityRepository.save(authority);
                log.info("Authority: {} created.",savedAuth);
            } else {
                log.info("Authority [{}] already exists.", input);
            }
        }
    }

    private Account createAccount(String username, String password) {
        return accountRepository.findByUsername(username)
                .orElseGet(() -> {
                    Account account = new Account();
                    account.setUsername(username);
                    account.setPassword(password);
                    Account savedAcc = accountRepository.save(account);
                    log.info("Account: {}", savedAcc);
                    return savedAcc;
                });
    }

    private Team createTeam() {
        return teamRepository.findByName("Administration")
                .orElseGet(() -> {
                    Team team = new Team();
                    team.setName("Administration");
                    Team savedTeam = teamRepository.save(team);
                    log.info("Team: {} created.", savedTeam);
                    return savedTeam;
                });
    }

    private Organization createOrganization() {
        return organizationRepository.findByName("NeueFische GmbH")
                .orElseGet(() -> {
                    Organization organization = new Organization();
                    organization.setName("NeueFische GmbH");
                    Organization savedOrga = organizationRepository.save(organization);
                    log.info("Organization: {} created.", savedOrga);
                    return savedOrga;
                });
    }
}
