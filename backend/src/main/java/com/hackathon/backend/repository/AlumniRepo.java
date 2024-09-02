package com.hackathon.backend.repository;

import com.hackathon.backend.model.Alumni;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlumniRepo extends MongoRepository<Alumni, String> {
    Alumni findByUsername(String username);
}
