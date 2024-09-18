package com.hackathon.backend.controller;

import com.hackathon.backend.exception.UserException;
import com.hackathon.backend.exception.UserNotFoundException;
import com.hackathon.backend.model.user.Admin;
import com.hackathon.backend.model.user.Alumni;
import com.hackathon.backend.model.user.Student;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.request.UpdateUserRequest;
import com.hackathon.backend.response.ApiResponse;
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
            return ResponseEntity.ok("com.hackathon.backend.model.User deleted successfully");
        }
        catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token)
            throws UserException {

        User user = this.userService.findUserProfile(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String query) {

        List<User> users = this.userService.searchUser(query);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest request,
                                                         @RequestHeader("Authorization") String token) throws UserException {

        User user = this.userService.findUserProfile(token);
        this.userService.updateUser(user.getId(), request);

        ApiResponse response = new ApiResponse();
        response.setMessage("com.hackathon.backend.model.User updated Successfully");
        response.setStatus(true);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
