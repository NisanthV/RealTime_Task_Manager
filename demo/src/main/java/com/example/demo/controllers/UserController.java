package com.example.demo.controllers;
import com.example.demo.jwt.JwtHelper;
import com.example.demo.models.UserModel;
import com.example.demo.services.UserServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserServices services;

    @Autowired
    JwtHelper jwt;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserModel user){
        return services.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserModel user){
        return services.login(user);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader(value = "Authorization", required = true) String authHeader){

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);
        if(!jwt.isVaild(token)){
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        String username = jwt.getUserName(token);

        return new ResponseEntity<>("hai" + " " + username, HttpStatus.OK);

    }
}
