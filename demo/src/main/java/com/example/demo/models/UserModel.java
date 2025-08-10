package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


@AllArgsConstructor
@Data
@Entity
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull(message = "username can't be empty")
    @Size(min = 3, max = 100, message = "username length range between 3 to 100")
    private String username;

    @NotNull
    @Size(min = 8, message = "password must have minimum length 8")
    private String password;

    public UserModel(){

    }
}
