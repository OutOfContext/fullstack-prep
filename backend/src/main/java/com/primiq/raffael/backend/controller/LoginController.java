package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dto.*;
import com.primiq.raffael.backend.model.dto.request.LoginRequest;
import com.primiq.raffael.backend.service.AccountService;
import com.primiq.raffael.backend.service.AuthenticationService;
import com.primiq.raffael.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @PostMapping
    public Message<UserProfile> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        AuthorityDetails authorityDetails = authenticationService.getAuthorityDetails(authentication);
        UserProfile userProfile = new UserProfile();
        String tokenString = jwtService.generateToken(request.getUsername());
        userProfile.setToken(tokenString);
        userProfile.setAccount(new AccountDto(authorityDetails.getUser(), authorityDetails.getTeams(), authorityDetails.getOrganizations()));
        return Message.of(userProfile);

    }
}
