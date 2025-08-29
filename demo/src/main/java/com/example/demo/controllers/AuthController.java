package com.example.demo.controllers;

import com.example.demo.dto.TokenDto;
import com.example.demo.jwt.JwtHelper;
import com.example.demo.models.UserModel;
import com.example.demo.services.AuthServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthController {

    @Autowired
    private AuthServices services;

    @Autowired
    private JwtHelper jwt;


    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserModel user){
        return services.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserModel user){
        return services.login(user);
    }

    @PostMapping("/get-access-token")
    public ResponseEntity<TokenDto> getAccessToken(@RequestBody String refreshToken){
        return services.createAccessToken(refreshToken);
    }

}
