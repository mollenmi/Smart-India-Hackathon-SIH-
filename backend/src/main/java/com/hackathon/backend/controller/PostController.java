//package com.hackathon.backend.controller;
//
//import com.hackathon.backend.model.Post;
//import com.hackathon.backend.service.PostService_before;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
////@RestController
//@RequiredArgsConstructor
//@RequestMapping("/posts")
//public class PostController_before {
//
//    private final PostService_before postService;
//
//    @GetMapping("/feed")
//    public ResponseEntity<Page<Post>> getFeed(Pageable pageable) {
//        Page<Post> posts = postService.getFeed(pageable);
//        return new ResponseEntity<>(posts, HttpStatus.OK);
//    }
//
//    @PostMapping("/create")
//    public ResponseEntity<Post> createPost(@RequestParam String content) {
//        String userId = postService.getLoggedInUserId();
//        Post post = postService.createPost(content, userId);
//        return new ResponseEntity<>(post, HttpStatus.CREATED);
//    }
//
//    @PostMapping("/like/{postId}")
//    public ResponseEntity<Post> likePost(@PathVariable String postId) {
//        String userId = postService.getLoggedInUserId();
//        Post likedPost = postService.likePost(postId, userId);
//        if (likedPost != null) {
//            return ResponseEntity.ok(likedPost);
//        }
//        return ResponseEntity.badRequest().build();
//    }
//
//    @PostMapping("/comment/{postId}")
//    public ResponseEntity<Post> addComment(@PathVariable String postId, @RequestParam String text) {
//        String userId = postService.getLoggedInUserId();
//        Post commentedPost = postService.addComment(postId, userId, text);
//        if (commentedPost != null) {
//            return ResponseEntity.ok(commentedPost);
//        }
//        return ResponseEntity.badRequest().build();
//    }
//
//    @GetMapping("/likes/{postId}")
//    public ResponseEntity<Long> getNumberOfLikes(@PathVariable String postId) {
//        return ResponseEntity.ok(postService.getNumberOfLikes(postId));
//    }
//
//    @GetMapping("/comments/{postId}")
//    public ResponseEntity<Long> getNumberOfComments(@PathVariable String postId) {
//        return ResponseEntity.ok(postService.getNumberOfComments(postId));
//    }
//
//    @GetMapping("/post/{postId}")
//    public ResponseEntity<Post> getPost(@PathVariable String postId) {
//        Post post = postService.getPostById(postId);
//        if (post != null) {
//            return ResponseEntity.ok(post);
//        }
//        return ResponseEntity.notFound().build();
//    }
//
//    @DeleteMapping("/post/{postId}")
//    public ResponseEntity<Void> deletePost(@PathVariable String postId) {
//        boolean isDeleted = postService.deletePost(postId);
//        if (isDeleted) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.notFound().build();
//    }
//}
