package com.hackathon.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

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
    private Set<Student> student = new HashSet<>();
    @DBRef
    private Set<Alumni> alumni = new HashSet<>();
    @DBRef
    private Set<Admin> admin = new HashSet<>();

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
