package com.hackathon.backend.controller;

import com.hackathon.backend.model.post.Comment;
import com.hackathon.backend.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private CommentService commentService;

    @PostMapping("/add")
    public Comment addComment(@RequestParam String postId, @RequestParam String userId, @RequestParam String content) {
        return commentService.addComment(postId, userId, content);
    }

    @PostMapping("/reply")
    public Comment addReply(@RequestParam String postId, @RequestParam String userId, @RequestParam String content, @RequestParam String parentCommentId) {
        return commentService.addReply(postId, userId, content, parentCommentId);
    }

    @GetMapping("/comment/{postId}")
    public List<Comment> getComments(@PathVariable String postId) {
        return commentService.getCommentsForPost(postId);
    }

    @GetMapping("/comment/replies/{commentId}")
    public List<Comment> getReplies(@PathVariable String commentId) {
        return commentService.getRepliesForComment(commentId);
    }
}
