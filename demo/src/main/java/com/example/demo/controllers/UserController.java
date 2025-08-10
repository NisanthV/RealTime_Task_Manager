package com.example.demo.controllers;
import com.example.demo.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserServices services;

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal String username){

        return new ResponseEntity<>("hai" + " " + username, HttpStatus.OK);

    }
}
