package com.hackathon.backend.controller;

import com.hackathon.backend.exception.UserAlreadyExistsException;
import com.hackathon.backend.model.Admin;
import com.hackathon.backend.model.Alumni;
import com.hackathon.backend.model.Student;
import com.hackathon.backend.request.LoginRequest;
import com.hackathon.backend.response.UserResponse;
import com.hackathon.backend.security.user.CustomUserDetails;
import com.hackathon.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register-alumni")
    public ResponseEntity<?> alumniRegistration(@RequestParam("name") String name,
                                                @RequestParam("username") String username,
                                                @RequestParam("password") String password,
                                                @RequestParam("email") String email,
                                                @RequestParam("photo")MultipartFile photo) {
        try {
            Alumni alumni = new Alumni();
            alumni.setName(name);
            alumni.setUsername(username);
            alumni.setPassword(password);
            alumni.setEmail(email);
            alumni.setPhoto(photo.getBytes());
            userService.addAlumni(alumni);
            return ResponseEntity.ok("Alumni registered successfully");
        }
        catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing photo");
        }
    }

    @PostMapping("/register-student")
    public ResponseEntity<?> studentRegistration(@RequestParam("name") String name,
                                                 @RequestParam("username") String username,
                                                 @RequestParam("password") String password,
                                                 @RequestParam("email") String email,
                                                 @RequestParam("photo")MultipartFile photo) {
        try {
            Student student = new Student();
            student.setName(name);
            student.setUsername(username);
            student.setPassword(password);
            student.setEmail(email);
            student.setPhoto(photo.getBytes());
            userService.addStudent(student);
            return ResponseEntity.ok("Student registered successfully");
        }
        catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing photo");
        }
    }

    @PostMapping("/register-admin")
    public ResponseEntity<?> adminRegistration(@RequestParam("name") String name,
                                               @RequestParam("username") String username,
                                               @RequestParam("password") String password,
                                               @RequestParam("email") String email) {
        try {
            Admin admin = new Admin();
            admin.setName(name);
            admin.setUsername(username);
            admin.setPassword(password);
            admin.setEmail(email);
            userService.addAdmin(admin);
            return ResponseEntity.ok("Admin registered successfully");
        }
        catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing photo");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        System.out.println("Successfully logged in: " + userDetails.getUsername());
        return ResponseEntity.ok(new UserResponse(userDetails.getUserId(), userDetails.getUsername(), roles));
    }
}
