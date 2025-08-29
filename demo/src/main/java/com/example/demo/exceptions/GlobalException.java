package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> notValid(MethodArgumentNotValidException exception){

        Map<String, List<String>> error = new HashMap<>();

        exception.getBindingResult().getFieldErrors().forEach(
                e -> {
                    String field = e.getField();
                    String message = e.getDefaultMessage();

                    error.computeIfAbsent(field, k -> new ArrayList<>()).add(message);
                }
        );

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JwtRefreshException.class)
    public ResponseEntity<?> notValid(JwtRefreshException exception){

        return new ResponseEntity<String>("Token not valid", HttpStatus.UNAUTHORIZED);
    }
}
