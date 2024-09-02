package com.hackathon.backend.repository;

import com.hackathon.backend.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepo extends MongoRepository<Admin, String> {
    Admin findByUsername(String username);
}
