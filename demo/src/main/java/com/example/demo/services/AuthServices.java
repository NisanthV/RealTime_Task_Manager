package com.example.demo.services;

import com.example.demo.dto.TokenDto;
import com.example.demo.exceptions.JwtRefreshException;
import com.example.demo.jwt.JwtHelper;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class AuthServices {
    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtHelper jwt;

    @Autowired
    private ModelMapper modelMapper;

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

        String accessToken = jwt.createAccessToken(obj.getUsername());
        String refreshToken = jwt.createRefreshToken(obj.getUsername());
        TokenDto token = TokenDto.builder().accessToken(accessToken).refreshToken(refreshToken).build();

        return new ResponseEntity<>(token, HttpStatus.OK);

    }

    public ResponseEntity<TokenDto> createAccessToken(String refreshToken) {

        if(!"refresh".equals(jwt.gettokenType(refreshToken)) || jwt.isValiedRefreshToken(refreshToken)){
            throw new JwtRefreshException();
        }

        String token = jwt.createAccessToken(jwt.getUserName(refreshToken));

        TokenDto response = TokenDto.builder().refreshToken(refreshToken).accessToken(token).build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
