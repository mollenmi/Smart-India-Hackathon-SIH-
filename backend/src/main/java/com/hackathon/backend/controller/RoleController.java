package com.hackathon.backend.controller;

import com.hackathon.backend.exception.RoleAlreadyExistsException;
import com.hackathon.backend.model.Alumni;
import com.hackathon.backend.model.Role;
import com.hackathon.backend.model.Student;
import com.hackathon.backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("/role")
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getRoles(), FOUND);
    }

    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role role) {
        try {
            roleService.createRole(role);
            return ResponseEntity.ok("New role created successfully");
        }
        catch (RoleAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") String roleId) {
        roleService.deleteRole(roleId);
    }

    @PostMapping("/remove-all-users-from-role/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable("roleId") String roleId) {
        return roleService.removeAllUsersFromRole(roleId);
    }

    @PostMapping("/remove-all-alumni-from-role/{roleId}")
    public Role removeAllAlumniFromRole(@PathVariable("roleId") String roleId) {
        return roleService.removeAllAlumniFromRole(roleId);
    }

    @PostMapping("/remove-all-student-from-role/{roleId}")
    public Role removeAllStudentsFromRole(@PathVariable("roleId") String roleId) {
        return roleService.removeAllStudentsFromRole(roleId);
    }

    @PostMapping("/remove-role-from-alumni")
    public Alumni removeAlumniFromRole(@RequestParam("alumniId") String alumniId, @RequestParam("roleId") String roleId) {
        return roleService.removeAlumniFromRole(alumniId, roleId);
    }

    @PostMapping("/remove-role-from-student")
    public Student removeStudentFromRole(@RequestParam("studentId") String studentId, @RequestParam("roleId") String roleId) {
        return roleService.removeStudentFromRole(studentId, roleId);
    }

    @PostMapping("/assign-role-to-alumni")
    public Alumni assignAlumniToRole(@RequestParam("alumniId") String alumniId, @RequestParam("roleId") String roleId) {
        return roleService.assignRoleToAlumni(alumniId, roleId);
    }

    @PostMapping("/assign-role-to-student")
    public Student assignStudentToRole(@RequestParam("studentId") String studentId, @RequestParam("roleId") String roleId) throws RoleNotFoundException {
        return roleService.assignRoleToStudent(studentId, roleId);
    }
}
