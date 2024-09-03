package com.hackathon.backend.repository;

import com.hackathon.backend.model.Alumni;
import com.hackathon.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Optional;

@EnableMongoRepositories
public interface AlumniRepo extends MongoRepository<Alumni, String> {
    Optional<User> findByUsername(String username);
    boolean existsUserByUsername(String username);
}
