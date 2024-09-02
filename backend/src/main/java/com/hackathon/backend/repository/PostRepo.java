package com.hackathon.backend.repository;

import com.hackathon.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepo extends MongoRepository<Post, String> {
}
