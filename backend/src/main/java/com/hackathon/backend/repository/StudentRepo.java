package com.hackathon.backend.repository;

import com.hackathon.backend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepo extends MongoRepository<Student, String> {
    Student findByUsername(String username);
}
