package com.hackathon.backend.controller;

import com.hackathon.backend.exception.UserNotFoundException;
import com.hackathon.backend.model.Admin;
import com.hackathon.backend.model.Alumni;
import com.hackathon.backend.model.Student;
import com.hackathon.backend.model.User;
import com.hackathon.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.FOUND);
    }

    @GetMapping("/all-alumni")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Alumni>> getAllAlumni() {
        return new ResponseEntity<>(userService.getAllAlumni(), HttpStatus.FOUND);
    }

    @GetMapping("/all-student")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Student>> getAllStudent() {
        return new ResponseEntity<>(userService.getAllStudent(), HttpStatus.FOUND);
    }

    @GetMapping("/all-admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Admin>> getAllAdmin() {
        return new ResponseEntity<>(userService.getAllAdmin(), HttpStatus.FOUND);
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_ALUMNI') or hasRole('ROLE_STUDENT')")
    public ResponseEntity<?> getUser(@PathVariable("username") String username) {
        try {
            Object user = userService.getUserByUsername(username);
            return ResponseEntity.ok(user);
        }
        catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }

    @DeleteMapping("/delete/{username}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_ALUMNI')")
    public ResponseEntity<String> deleteUser(@PathVariable("username") String username) {
        try {
            userService.deleteUserByUsername(username);
            return ResponseEntity.ok("User deleted successfully");
        }
        catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }
}
