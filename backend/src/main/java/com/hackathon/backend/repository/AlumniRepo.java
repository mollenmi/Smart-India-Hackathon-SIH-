package com.hackathon.backend.repository;

import com.hackathon.backend.model.user.Alumni;
import com.hackathon.backend.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;
import java.util.Optional;

@EnableMongoRepositories
public interface AlumniRepo extends MongoRepository<Alumni, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    @Query("{ '$or': [ { 'name': { $regex: ?0, $options: 'i' } }, { 'username': { $regex: ?0, $options: 'i' } } ] }")
    List<Alumni> searchUser(String query);
}
