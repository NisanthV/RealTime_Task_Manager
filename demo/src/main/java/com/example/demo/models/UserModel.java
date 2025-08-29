package com.example.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class UserModel extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "username can't be empty")
    @Size(min = 3, max = 100, message = "username length range between 3 to 100")
    private String username;

    @NotNull
    @Size(min = 8, message = "password must have minimum length 8")
    private String password;

    @NotNull
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be a 10-digit number.")
    private String phone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="role_id")
    private RoleModel role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="department_id")
    private DepartmentModel department;

}
