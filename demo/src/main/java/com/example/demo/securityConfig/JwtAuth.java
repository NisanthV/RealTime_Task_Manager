package com.example.demo.securityConfig;

import com.example.demo.jwt.JwtHelper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
class JwtAuth extends OncePerRequestFilter{

    @Autowired
    private JwtHelper jwt;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader("Authorization");

        if(authorization != null && authorization.startsWith("Bearer")){

            String token = authorization.substring(7);

            if(jwt.isVaild(token)){

                String username = jwt.getUserName(token);
                UsernamePasswordAuthenticationToken authencation = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());

                SecurityContextHolder.getContext().setAuthentication(authencation);
            }
        }

        filterChain.doFilter(request, response);
    }


}
