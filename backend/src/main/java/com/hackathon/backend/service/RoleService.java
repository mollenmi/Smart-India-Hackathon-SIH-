package com.hackathon.backend.service;

import com.hackathon.backend.exception.RoleAlreadyExistsException;
import com.hackathon.backend.exception.UserAlreadyExistsException;
import com.hackathon.backend.model.user.Admin;
import com.hackathon.backend.model.user.Alumni;
import com.hackathon.backend.model.user.Role;
import com.hackathon.backend.model.user.Student;
import com.hackathon.backend.repository.AdminRepo;
import com.hackathon.backend.repository.AlumniRepo;
import com.hackathon.backend.repository.RoleRepo;
import com.hackathon.backend.repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepo roleRepo;
    private final StudentRepo studentRepo;
    private final AlumniRepo alumniRepo;
    private final AdminRepo adminRepo;

    public List<Role> getRoles() {
        return roleRepo.findAll();
    }

    public void createRole(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if(roleRepo.existsByName(roleName)) {
            throw new RoleAlreadyExistsException(theRole.getName() + " role already exists");
        }
        roleRepo.save(role);
    }

    public void deleteRole(String roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepo.deleteById(roleId);
    }

    public Role findByName(String name) {
        return roleRepo.findByName(name).get();
    }

    public Admin removeAdminFromRole(String adminId, String roleId) {
        Optional<Admin> admin = adminRepo.findById(adminId);
        Optional<Role> role = roleRepo.findById(roleId);

        if(role.isPresent() && role.get().getAdmin().contains(admin.get())) {
            role.get().removeAdminFromRole(admin.get());
            roleRepo.save(role.get());
            return admin.get();
        }
        throw new UsernameNotFoundException("Alumni not found");
    }

    public Alumni removeAlumniFromRole(String alumniId, String roleId) {
        Optional<Alumni> alumni = alumniRepo.findById(alumniId);
        Optional<Role> role = roleRepo.findById(roleId);

        if(role.isPresent() && role.get().getAlumni().contains(alumni.get())) {
            role.get().removeAlumniFromRole(alumni.get());
            roleRepo.save(role.get());
            return alumni.get();
        }
        throw new UsernameNotFoundException("Alumni not found");
    }

    public Student removeStudentFromRole(String studentId, String roleId) {
        Optional<Student> student = studentRepo.findById(studentId);
        Optional<Role> role = roleRepo.findById(roleId);

        if(role.isPresent() && role.get().getStudent().contains(student.get())) {
            role.get().removeStudentFromRole(student.get());
            roleRepo.save(role.get());
            return student.get();
        }
        throw new UsernameNotFoundException("Student not found");
    }

    public Alumni assignRoleToAlumni(String alumniId, String roleId) {
        Optional<Alumni> alumni = alumniRepo.findById(alumniId);
        Optional<Role> role = roleRepo.findById(roleId);

        if(alumni.isPresent() && role.get().getAlumni().contains(alumni.get())) {
            throw new UserAlreadyExistsException(alumni.get().getName() + " is already assigned to role " + role.get().getName()+ " role");
        }
        if(role.isPresent()) {
            role.get().assignRoleToAlumni(alumni.get());
            roleRepo.save(role.get());
        }
        return alumni.get();
    }

    public Student assignRoleToStudent(String alumniId, String roleId) {
        Optional<Student> student = studentRepo.findById(alumniId);
        Optional<Role> role = roleRepo.findById(roleId);

        if(student.isPresent() && role.get().getStudent().contains(student.get())) {
            throw new UserAlreadyExistsException(student.get().getName() + " is already assigned to role " + role.get().getName()+ " role");
        }
        if(role.isPresent()) {
            role.get().assignRoleToStudent(student.get());
            roleRepo.save(role.get());
        }
        return student.get();
    }

    public Admin assignRoleToAdmin(String adminId, String roleId) {
        Optional<Admin> admin = adminRepo.findById(adminId);
        Optional<Role> role = roleRepo.findById(roleId);

        if(admin.isPresent() && role.get().getStudent().contains(admin.get())) {
            throw new UserAlreadyExistsException(admin.get().getName() + " is already assigned to role " + role.get().getName()+ " role");
        }
        if(role.isPresent()) {
            role.get().assignRoleToAdmin(admin.get());
            roleRepo.save(role.get());
        }
        return admin.get();
    }

    public Role removeAllUsersFromRole(String roleId) {
        Optional<Role> role = roleRepo.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        return roleRepo.save(role.get());
    }

    public Role removeAllAlumniFromRole(String roleId) {
        Optional<Role> role = roleRepo.findById(roleId);
        role.ifPresent(Role::removeAllAlumniFromRole);
        return roleRepo.save(role.get());
    }

    public Role removeAllStudentsFromRole(String roleId) {
        Optional<Role> role = roleRepo.findById(roleId);
        role.ifPresent(Role::removeAllStudentsFromRole);
        return roleRepo.save(role.get());
    }
}
