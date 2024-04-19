package com.primiq.raffael.backend.controller;

import com.primiq.raffael.backend.model.dto.Message;
import com.primiq.raffael.backend.model.dto.Token;
import com.primiq.raffael.backend.model.dto.request.LoginRequest;
import com.primiq.raffael.backend.service.AccountService;
import com.primiq.raffael.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping
    public Message<Token> login(@RequestBody LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        if(authentication.isAuthenticated()){
            return Message.of(new Token(jwtService.generateToken(request.getUsername())));
        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }
}
