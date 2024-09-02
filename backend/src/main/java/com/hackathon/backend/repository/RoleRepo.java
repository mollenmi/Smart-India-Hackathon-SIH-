package com.hackathon.backend.repository;

import com.hackathon.backend.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepo extends MongoRepository<Role, String> {

    Optional<Role> findByName(String role);
    boolean existsByName(String role);
}
