package com.hackathon.backend.controller;

import com.hackathon.backend.model.Post;
import com.hackathon.backend.repository.PostRepo;
import com.hackathon.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @GetMapping("/feed")
    public Page<Post> getFeed(@RequestParam("page") int page, @RequestParam("size") int size) {
        return postService.getFeed(page, size);
    }

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestParam String content, @RequestParam String imageId) {
        String userId = postService.getLoggedInUserId();
        Post post = postService.createPost(content, imageId, userId);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @PostMapping("/like/{postId}")
    public ResponseEntity<Post> likePost(@PathVariable String postId, @RequestParam String userId) {
        Post likedPost = postService.likePost(postId, userId);
        if (likedPost != null) {
            return ResponseEntity.ok(likedPost);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/comment/{postId}")
    public ResponseEntity<Post> addComment(@PathVariable String postId, @RequestParam String userId, @RequestParam String text) {
        Post commentedPost = postService.addComment(postId, userId, text);
        if (commentedPost != null) {
            return ResponseEntity.ok(commentedPost);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/likes/{postId}")
    public ResponseEntity<Long> getNumberOfLikes(@PathVariable String postId) {
        return ResponseEntity.ok(postService.getNumberOfLikes(postId));
    }

    @GetMapping("/comments{postId}")
    public ResponseEntity<Long> getNumberOfComments(@PathVariable String postId) {
        return ResponseEntity.ok(postService.getNumberOfComments(postId));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable String postId) {
        Post post = postService.getPostById(postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/image/{postId}")
    public ResponseEntity<byte[]> getPostImage(@PathVariable String postId) throws IOException {
        Post post = postService.getPostById(postId);
        if (post != null && post.getImageId() != null) {
            byte[] imageData = postService.getPostImage(post.getImageId());
            return ResponseEntity.ok(imageData);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable String postId) throws IOException {
        boolean isDeleted = postService.deletePost(postId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
