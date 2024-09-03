package com.hackathon.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Student implements User, UserDetails {

    @Id
    private String studentId;
    private String name;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String course;
    private Integer year;
    private byte[] photo;
    private Collection<? extends GrantedAuthority> authorities;

    @DBRef
    private Collection<Role> roles = new HashSet<>();

    @Override
    public String getId() {
        return studentId;
    }
}
