package com.hackathon.backend.repository;

import com.hackathon.backend.model.post.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepo extends MongoRepository<Post, String> {
//    List<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
