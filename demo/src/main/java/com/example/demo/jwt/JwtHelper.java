package com.example.demo.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;


@Component
public class JwtHelper {

    private final String secret = "secret key for development process and this key feed in jwt token";
    private final long expiryTime = 60 * 1_000;
    private final long refreshExpiryTime = 7 * 24 * 60 * 60 * 1000;
    private final SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

    public String createAccessToken(String subject){

        return Jwts.builder().subject(subject).claim("type","access").issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + expiryTime))
                .signWith(key).compact();
    }

    public String createRefreshToken(String subject){

        return Jwts.builder().subject(subject).claim("type", "refresh").issuedAt(new Date(System.currentTimeMillis() + refreshExpiryTime))
                .signWith(key).compact();
    }

    public String gettokenType(String token){

        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().get("type", String.class);
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

    public boolean isValiedRefreshToken(String token){

        try{
            Date expiration = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getExpiration();
            return expiration.before(new Date());
        }
        catch (Exception e){
            return false;
        }
    }
}
