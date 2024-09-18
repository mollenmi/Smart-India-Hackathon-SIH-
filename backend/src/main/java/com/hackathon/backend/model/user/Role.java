package com.hackathon.backend.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.HashSet;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Role {

    @Id
    private String roleId;
    private String name;

    @DBRef
    private Collection<Student> student = new HashSet<>();
    @DBRef
    private Collection<Alumni> alumni = new HashSet<>();
    @DBRef
    private Collection<Admin> admin = new HashSet<>();

    public Role(String name) {
        this.name = name;
    }

    public void assignRoleToStudent(Student theStudent) {
        student.add(theStudent);
        theStudent.getRoles().add(this);
    }

    public void removeStudentFromRole(Student theStudent) {
        student.remove(theStudent);
        theStudent.getRoles().remove(this);
    }

    public void assignRoleToAlumni(Alumni alumni) {
        this.alumni.add(alumni);
        alumni.getRoles().add(this);
    }

    public void removeAlumniFromRole(Alumni alumni) {
        this.alumni.remove(alumni);
        alumni.getRoles().remove(this);
    }

    public void assignRoleToAdmin(Admin admin) {
        this.admin.add(admin);
        admin.getRoles().add(this);
    }

    public void removeAdminFromRole(Admin admin) {
        this.admin.remove(admin);
        admin.getRoles().remove(this);
    }

    public void removeAllStudentsFromRole() {
        if (this.student != null) {
            for (Student theStudent : new HashSet<>(this.student)) {
                removeStudentFromRole(theStudent);
            }
        }
    }

    public void removeAllAlumniFromRole() {
        if (this.alumni != null) {
            for (Alumni alumni : new HashSet<>(this.alumni)) {
                removeAlumniFromRole(alumni);
            }
        }
    }

    public void removeAllUsersFromRole() {
        if (this.student != null) {
            for (Student theStudent : new HashSet<>(this.student)) {
                removeStudentFromRole(theStudent);
            }
        }
    }
}
