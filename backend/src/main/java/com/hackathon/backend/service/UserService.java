package com.hackathon.backend.service;

import com.hackathon.backend.model.Admin;
import com.hackathon.backend.model.Alumni;
import com.hackathon.backend.model.Student;
import com.hackathon.backend.model.User;
import com.hackathon.backend.repository.AdminRepo;
import com.hackathon.backend.repository.AlumniRepo;
import com.hackathon.backend.repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

    private final AlumniRepo alumniRepo;
    private final StudentRepo studentRepo;
    private final AdminRepo adminRepo;

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();

        List<Student> student = studentRepo.findAll();
        users.addAll(student);

        List<Alumni> alumni = alumniRepo.findAll();
        users.addAll(alumni);

        List<Admin> admins = adminRepo.findAll();
        users.addAll(admins);

        return users;
    }

    public List<Alumni> getAllAlumni() {
        return alumniRepo.findAll();
    }

    public List<Student> getAllStudent() {
        return studentRepo.findAll();
    }

    public List<Admin> getAllAdmin() {
        return adminRepo.findAll();
    }

    public Object getUserByUsername(String username) {
        User user = findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    @Transactional
    public void deleteUserByUsername(String username) {

        User user = findUserByUsername(username);
        if (user != null) {
            switch (user) {
                case Student student -> studentRepo.delete(student);
                case Alumni alumni -> alumniRepo.delete(alumni);
                case Admin admin -> adminRepo.delete(admin);
                default -> {
                }
            }
        }
    }

    private User findUserByUsername(String username) {
        User user = studentRepo.findByUsername(username);
        if (user != null) return user;

        user = alumniRepo.findByUsername(username);
        if (user != null) return user;

        user = adminRepo.findByUsername(username);
        return user;
    }
}
