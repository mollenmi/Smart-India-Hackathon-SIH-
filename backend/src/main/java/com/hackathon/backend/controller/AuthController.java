package com.hackathon.backend.controller;

import com.hackathon.backend.exception.UserAlreadyExistsException;
import com.hackathon.backend.model.Admin;
import com.hackathon.backend.model.Alumni;
import com.hackathon.backend.model.Student;
import com.hackathon.backend.model.User;
import com.hackathon.backend.request.LoginRequest;
import com.hackathon.backend.response.UserResponse;
import com.hackathon.backend.security.user.CustomUserDetails;
import com.hackathon.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register-alumni")
    public ResponseEntity<?> alumniRegistration(@RequestBody Alumni alumni) {
        try {
            userService.addAlumni(alumni);
            return ResponseEntity.ok("Alumni registered successfully");
        }
        catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register-student")
    public ResponseEntity<?> studentRegistration(@RequestBody Student student) {
        try {
            userService.addStudent(student);
            return ResponseEntity.ok("Student registered successfully");
        }
        catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register-admin")
    public ResponseEntity<?> adminRegistration(@RequestBody Admin admin) {
        try {
            userService.addAdmin(admin);
            return ResponseEntity.ok("Admin registered successfully");
        }
        catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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

        return ResponseEntity.ok(new UserResponse(userDetails.getUserId(), userDetails.getUsername(), roles));
    }
}
