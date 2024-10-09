package com.hackathon.backend.controller;

import com.hackathon.backend.exception.UserAlreadyExistsException;
import com.hackathon.backend.model.user.Admin;
import com.hackathon.backend.model.user.Alumni;
import com.hackathon.backend.model.user.Student;
import com.hackathon.backend.request.LoginRequest;
import com.hackathon.backend.response.AuthResponse;
import com.hackathon.backend.response.UserResponse;
import com.hackathon.backend.security.TokenProvider;
import com.hackathon.backend.security.user.CustomUserDetails;
import com.hackathon.backend.security.user.CustomUserDetailsService;
import com.hackathon.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/register-alumni")
    public ResponseEntity<?> alumniRegistration(@RequestParam("name") String name,
                                                @RequestParam("username") String username,
                                                @RequestParam("password") String password,
                                                @RequestParam("email") String email,
                                                @RequestParam(value = "photo", required = false)MultipartFile photo) {
        try {
            Alumni alumni = new Alumni();
            alumni.setName(name);
            alumni.setUsername(username);
            alumni.setPassword(password);
            alumni.setEmail(email);
            alumni.setPhoto(photo.getBytes());
            userService.addAlumni(alumni);

            Authentication authentication = this.authenticate(username, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = this.tokenProvider.generateToken(authentication);
            AuthResponse response = new AuthResponse(jwt, true);

            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        }
        catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error occurred");
        }
    }

    @PostMapping("/register-student")
    public ResponseEntity<?> studentRegistration(@RequestParam("name") String name,
                                                 @RequestParam("username") String username,
                                                 @RequestParam("password") String password,
                                                 @RequestParam("email") String email,
                                                 @RequestParam(value = "photo", required = false) MultipartFile photo) {
        System.out.println("Received registration: " + name + ", " + ", " + username + email + ", " + password + ", " + photo);
        try {
            Student student = new Student();
            student.setName(name);
            student.setUsername(username);
            student.setPassword(password);
            student.setEmail(email);

            // Check if the photo is provided and process it
            if (photo != null && !photo.isEmpty()) {
                student.setPhoto(photo.getBytes());
            } else {
                student.setPhoto(null);  // Or set a default/placeholder photo if needed
            }

            userService.addStudent(student);

            Authentication authentication = this.authenticate(username, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = this.tokenProvider.generateToken(authentication);
            AuthResponse response = new AuthResponse(jwt, true);

            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing photo file");
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();  // Or use a logger
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
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

            Authentication authentication = this.authenticate(username, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = this.tokenProvider.generateToken(authentication);
            AuthResponse response = new AuthResponse(jwt, true);

            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
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
        String jwt = this.tokenProvider.generateToken(authentication);

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        UserResponse userResponse = new UserResponse(userDetails.getUserId(), userDetails.getUsername(), roles);
        AuthResponse authResponse = new AuthResponse(jwt, true);

        Map<String, Object> response = new HashMap<>();
        response.put("auth", authResponse);
        response.put("user", userResponse);

        System.out.println("Successfully logged in: " + userDetails.getUsername());
        return ResponseEntity.ok(response);
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
