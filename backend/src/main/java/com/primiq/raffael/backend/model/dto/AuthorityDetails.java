package com.primiq.raffael.backend.model.dto;

import com.primiq.raffael.backend.model.dao.Account;
import com.primiq.raffael.backend.model.dao.Organization;
import com.primiq.raffael.backend.model.dao.Team;
import lombok.Data;

import java.util.List;

@Data
public class AuthorityDetails {

    private Account user;

    private List<Team> teams;

    private List<Organization> organizations;

}
