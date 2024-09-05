package com.hackathon.backend.service;

import com.hackathon.backend.model.Comment;
import com.hackathon.backend.repository.CommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private CommentRepo commentRepo;

    public Comment addComment(String postId, String userId, String content) {
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setUserId(userId);
        comment.setContent(content);
        comment.setCreatedAt(new Date().getTime());
        comment.setParentCommentId(null);
        return commentRepo.save(comment);
    }

    public Comment addReply(String postId, String userId, String content, String parentCommentId) {
        Comment reply = new Comment();
        reply.setPostId(postId);
        reply.setUserId(userId);
        reply.setContent(content);
        reply.setCreatedAt(new Date().getTime());
        reply.setParentCommentId(parentCommentId);
        Comment savedReply = commentRepo.save(reply);

        Comment parentComment = commentRepo.findById(parentCommentId).orElseThrow();
        parentComment.getReplies().add(savedReply);
        commentRepo.save(parentComment);

        return savedReply;
    }

    public List<Comment> getCommentsForPost(String postId) {
        return commentRepo.findByPostId(postId);
    }

    public List<Comment> getRepliesForComment(String parentCommentId) {
        return commentRepo.findByParentCommentId(parentCommentId);
    }
}
