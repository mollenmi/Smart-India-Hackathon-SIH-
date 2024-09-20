package com.hackathon.backend.repository;

import com.hackathon.backend.model.post.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;

@EnableMongoRepositories
public interface CommentRepo extends MongoRepository<Comment, String> {
    List<Comment> findByPostId(String postId);
    List<Comment> findByParentCommentId(String parentCommentId);
}
