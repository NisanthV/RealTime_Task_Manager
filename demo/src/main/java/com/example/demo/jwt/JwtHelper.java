package com.example.demo.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;


@Component
public class JwtHelper {
    private final String secret = "secret key for development process and this key feed in jwt token";

    public String createToken(String subject){

        long expiryTime = 2 * 60 * 1_000;

        return Jwts.builder().subject(subject).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + expiryTime))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
    }

    public boolean isVaild(String token){

        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build().parseSignedClaims(token);

            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public String getUserName(String token){

        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }
}
