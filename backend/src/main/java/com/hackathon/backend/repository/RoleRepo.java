package com.hackathon.backend.repository;

import com.hackathon.backend.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Optional;

@EnableMongoRepositories
public interface RoleRepo extends MongoRepository<Role, String> {

    Optional<Role> findByName(String role);
    boolean existsByName(String role);
}
