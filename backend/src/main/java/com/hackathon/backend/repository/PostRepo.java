package com.hackathon.backend.repository;

import com.hackathon.backend.model.post.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepo extends MongoRepository<Post, String> {
    List<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
