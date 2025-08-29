package com.example.demo.models;


import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;

import java.time.LocalDateTime;

@MappedSuperclass
public abstract class BaseEntity {

    @Column(nullable = false, updatable = false)
    protected LocalDateTime create_at;

    @PrePersist
    protected void onCreate(){
        this.create_at = LocalDateTime.now();
    }
}
