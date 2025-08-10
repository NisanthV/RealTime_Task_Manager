package com.example.demo.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;


@Component
public class JwtHelper {

    private final String secret = "secret key for development process and this key feed in jwt token";
    private final long expiryTime = 5 * 60 * 1_000;
    private final SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

    public String createToken(String subject){

        return Jwts.builder().subject(subject).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + expiryTime))
                .signWith(key).compact();
    }

    public boolean isVaild(String token){

        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);

            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public String getUserName(String token){

        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token)
                .getPayload().getSubject();
    }
}
