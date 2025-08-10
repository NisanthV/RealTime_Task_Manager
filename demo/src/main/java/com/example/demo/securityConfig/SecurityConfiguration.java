package com.example.demo.securityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
public class SecurityConfiguration {

    @Autowired
    private JwtAuth jwtauth;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        return http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                auth -> auth.requestMatchers("/auth/**").permitAll().anyRequest().authenticated()
        )
                .addFilterBefore(jwtauth, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
