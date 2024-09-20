package com.hackathon.backend.repository;

import com.hackathon.backend.model.post.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;

@EnableMongoRepositories
public interface PostRepo extends MongoRepository<Post, String> {
    List<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
