package com.primiq.raffael.backend.service;

import com.primiq.raffael.backend.model.dao.Team;
import com.primiq.raffael.backend.model.dto.request.team.TeamAddRequest;
import com.primiq.raffael.backend.model.dto.request.team.TeamDeleteRequest;
import com.primiq.raffael.backend.model.dto.request.team.TeamUpdateRequest;
import com.primiq.raffael.backend.model.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    public Team createTeam(TeamAddRequest teamAddRequest) {
        Team team = new Team();
        team.setName(teamAddRequest.getName());
        return teamRepository.save(team);
    }

    public Team updateTeam(TeamUpdateRequest teamUpdateRequest) {
        return teamRepository.findById(teamUpdateRequest.getId())
                .map(team -> {
                    team.setName(teamUpdateRequest.getName());
                    return teamRepository.save(team);
                }).orElseThrow(() -> new RuntimeException("Team not found."));
    }

    public Team deleteTeam(TeamDeleteRequest teamDeleteRequest) {
       return teamRepository.findById(teamDeleteRequest.getId())
                .map(team -> {
                    team.setUsers(Collections.emptySet());
                    return teamRepository.save(team);
                }).map(team -> {
                    teamRepository.delete(team);
                    return team;
                }).orElseThrow(() -> new RuntimeException("Team not found."));
    }
}
