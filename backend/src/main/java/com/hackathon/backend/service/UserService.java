package com.hackathon.backend.service;

import com.hackathon.backend.exception.ResourceNotFoundException;
import com.hackathon.backend.exception.UserAlreadyExistsException;
import com.hackathon.backend.model.post.Post;
import com.hackathon.backend.model.user.*;
import com.hackathon.backend.repository.AdminRepo;
import com.hackathon.backend.repository.AlumniRepo;
import com.hackathon.backend.repository.RoleRepo;
import com.hackathon.backend.repository.StudentRepo;
import com.hackathon.backend.request.UpdateUserRequest;
import com.hackathon.backend.security.TokenProvider;
import com.hackathon.backend.security.user.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final TokenProvider tokenProvider;
    private CustomUserDetailsService customUserDetailsService;
    AuthenticationManager authenticationManager;

    public User findUserById(String id) {
        Student student = studentRepo.findById(id).orElse(null);
        if (student != null) {
            return student;
        }

        Alumni alumni = alumniRepo.findById(id).orElse(null);
        if (alumni != null) {
            return alumni;
        }

        Admin admin = adminRepo.findById(id).orElse(null);
        if (admin != null) {
            return admin;
        }

        throw new RuntimeException("com.hackathon.backend.model.User not found");
    }

    public byte[] getProfilePictureById(String postId) {
        Optional<Student> student = studentRepo.findById(postId);
        if (student.isEmpty()) {
            byte[] photoBytes = student.get().getPhoto();
            if (photoBytes != null) {
                return photoBytes;
            }
        }

        Optional<Alumni> alumni = alumniRepo.findById(postId);
        if (alumni.isEmpty()) {
            byte[] photoBytes = alumni.get().getPhoto();
            if (photoBytes != null) {
                return photoBytes;
            }
        }

        return null;
    }

    public String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return ((UserDetails) principal).getUsername();
            } else {
                return principal.toString();
            }
        }
        return null;
    }

    public String deriveCommunityIdForUser(String userId) {

        Student student = studentRepo.findById(userId).orElse(null);
        if (student != null) {
            return student.getCommunityId();
        }

        Alumni alumni = alumniRepo.findById(userId).orElse(null);
        if (alumni != null) {
            return alumni.getCommunityId();
        }

        Admin admin = adminRepo.findById(userId).orElse(null);
        if (admin != null) {
            return admin.getCommunityId();
        }

        throw new RuntimeException("com.hackathon.backend.model.User not found");
    }


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
            throw new UsernameNotFoundException("com.hackathon.backend.model.User not found");
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
        String username = alumni.getUsername();
        if(alumniRepo.existsByUsername(alumni.getEmail()) || alumniRepo.existsByUsername(username)) {
            throw new UserAlreadyExistsException(username + " or email already exists");
        }
        alumni.setPassword(passwordEncoder.encode(alumni.getPassword()));
        System.out.println(alumni.getPassword());
        Role userRole = roleRepo.findByName("ROLE_ALUMNI").get();
        alumni.setRoles(Collections.singletonList(userRole));
        alumniRepo.save(alumni);
        roleService.assignRoleToAlumni(alumni.getAlumniId(), userRole.getRoleId());
    }

    public void addStudent(Student student) {
        String username = student.getUsername();
        if(studentRepo.existsByUsername(student.getEmail()) || studentRepo.existsByUsername(username)) {
            throw new UserAlreadyExistsException(username + " or email already exists");
        }
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        System.out.println(student.getPassword());

        Role userRole = roleRepo.findByName("ROLE_STUDENT").get();

        student.setRoles(Collections.singletonList(userRole));
        studentRepo.save(student);
        roleService.assignRoleToStudent(student.getStudentId(), userRole.getRoleId());
    }

    public void addAdmin(Admin admin) {
        if(adminRepo.existsByUsername(admin.getUsername())) {
            throw new UserAlreadyExistsException(admin.getUsername() + " already exists");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        System.out.println(admin.getPassword());
        Role userRole = roleRepo.findByName("ROLE_ADMIN").get();
        admin.setRoles(Collections.singletonList(userRole));
        adminRepo.save(admin);
        roleService.assignRoleToAdmin(admin.getAdminId(), userRole.getRoleId());
    }

    public User findUserProfile(String jwt) {
        String username = this.tokenProvider.getUsernameFromToken(jwt);

        if(username == null) {
            throw new BadCredentialsException("Recieved invalid token..");
        }

        Optional<User> user = this.studentRepo.findByUsername(username);
        if(user.isPresent()) {
            return user.get();
        }
        user = this.alumniRepo.findByUsername(username);
        if(user.isPresent()) {
            return user.get();
        }
        user = this.adminRepo.findByUsername(username);
        if(user.isPresent()) {
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    public User updateUser(String userId, UpdateUserRequest req) {

        Student student = studentRepo.findById(userId).get();
        if(student != null) {
            if(req.getName() != null) {
                student.setName(req.getName());
            }
            if(req.getImage() != null) {
                student.setPhoto(req.getImage());
            }
            return studentRepo.save(student);
        }

        Alumni alumni = alumniRepo.findById(userId).get();
        if(alumni != null) {
            if(req.getName() != null) {
                alumni.setName(req.getName());
            }
            if(req.getImage() != null) {
                alumni.setPhoto(req.getImage());
            }
            return this.alumniRepo.save(alumni);
        }

        Admin admin = adminRepo.findById(userId).get();
        if(admin != null) {
            if (req.getName() != null) {
                admin.setName(req.getName());
            }
            return adminRepo.save(admin);
        }
        throw new UsernameNotFoundException("User not found");
    }

    public List<User> searchUser(String query) {
        List<User> users = new ArrayList<>();

        List<Student> student = studentRepo.searchUser(query);
        users.addAll(student);

        List<Alumni> alumni = alumniRepo.searchUser(query);
        users.addAll(alumni);

        List<Admin> admins = adminRepo.searchUser(query);
        users.addAll(admins);

        return users;
    }

    public Authentication authenticate(String username, String password) {
        UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        // System.out.println(password);
        // System.out.println(userDetails.getPassword());
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password or username");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
