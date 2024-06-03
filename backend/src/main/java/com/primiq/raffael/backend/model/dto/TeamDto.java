package com.primiq.raffael.backend.model.dto;

import com.primiq.raffael.backend.model.dao.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {

    private Long id;

    private String name;

    private List<AccountDto> users;
    public TeamDto(Team team) {
        this.id = team.getId();
        this.name = team.getName();
        this.users = team.getUsers().stream().map(account -> new AccountDto(account, Collections.emptyList(), Collections.emptyList())).toList();
    }
}
