package com.hackathon.backend.service;

import com.hackathon.backend.exception.UserAlreadyExistsException;
import com.hackathon.backend.model.*;
import com.hackathon.backend.repository.AdminRepo;
import com.hackathon.backend.repository.AlumniRepo;
import com.hackathon.backend.repository.RoleRepo;
import com.hackathon.backend.repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService {

    private final AlumniRepo alumniRepo;
    private final StudentRepo studentRepo;
    private final AdminRepo adminRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

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
        Optional<User> user = studentRepo.findByUsername(username);
        if (user.isPresent()) return user.get();

        user = alumniRepo.findByUsername(username);
        if (user.isPresent()) return user.get();

        user = adminRepo.findByUsername(username);
        return user.orElse(null);
    }

    public void addAlumni(Alumni alumni) {
        if(alumniRepo.existsUserByUsername(alumni.getEmail())) {
            throw new UserAlreadyExistsException(alumni.getUsername() + " already exists");
        }
        alumni.setPassword(passwordEncoder.encode(alumni.getPassword()));
        System.out.println(alumni.getPassword());
        Role userRole = roleRepo.findByName("ROLE_ALUMNI").get();
        alumni.setRoles(Collections.singletonList(userRole));
//        roleService.assignRoleToAlumni(alumni.getAlumniId(), userRole.getRoleId());
        alumniRepo.save(alumni);
    }

    public void addStudent(Student student) {
        if(studentRepo.existsUserByUsername(student.getUsername())) {
            throw new UserAlreadyExistsException(student.getUsername() + " already exists");
        }
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        System.out.println(student.getPassword());
        Role userRole = roleRepo.findByName("ROLE_STUDENT").get();
        student.setRoles(Collections.singletonList(userRole));

        studentRepo.save(student);
    }

    public void addAdmin(Admin admin) {
        if(adminRepo.existsUserByUsername(admin.getUsername())) {
            throw new UserAlreadyExistsException(admin.getUsername() + " already exists");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        System.out.println(admin.getPassword());
        Role userRole = roleRepo.findByName("ROLE_ADMIN").get();
        admin.setRoles(Collections.singletonList(userRole));
        adminRepo.save(admin);
    }
}
