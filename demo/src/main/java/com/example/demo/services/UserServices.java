package com.example.demo.services;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.demo.jwt.JwtHelper;

@Service
public class UserServices {

    @Autowired
    UserRepository repo;

    @Autowired
    JwtHelper jwt;

    public ResponseEntity<?> createUser(UserModel user){
        UserModel obj;
        try{
            obj = repo.save(user);
        }catch (Exception e){
            return new ResponseEntity<>("unable to create", HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity<>(obj, HttpStatus.CREATED);
    }

    public ResponseEntity<?> login(UserModel user) {

        UserModel obj = repo.findByUsername(user.getUsername());

        if(!user.getPassword().equals(obj.getPassword())) return new ResponseEntity<>("invalid credentials", HttpStatus.BAD_REQUEST);

        String token = jwt.createToken(obj.getUsername());

        return new ResponseEntity<>(token, HttpStatus.OK);

    }
}
