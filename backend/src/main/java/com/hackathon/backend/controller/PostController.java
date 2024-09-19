package com.hackathon.backend.controller;

import com.hackathon.backend.model.post.Post;
import com.hackathon.backend.model.user.Admin;
import com.hackathon.backend.model.user.Alumni;
import com.hackathon.backend.model.user.Student;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.response.PostResponse;
import com.hackathon.backend.service.PostService;
import com.hackathon.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @GetMapping("/feed")
    public ResponseEntity<List<PostResponse>> getFeed(Pageable pageable) {
        List<Post> posts = postService.getFeed(pageable);
        List<PostResponse> postResponses = posts.stream()
                .map(post -> {
                    PostResponse response = new PostResponse();
                    response.setPost(post);

                    Object author = null;
                    if (post.getStudent() != null) {
                        author = post.getStudent();
                    } else if (post.getAlumni() != null) {
                        author = post.getAlumni();
                    } else if (post.getAdmin() != null) {
                        author = post.getAdmin();
                    }

                    if (author != null) {
                        if (author instanceof Student) {
                            response.setAuthorUsername(((Student) author).getUsername());
                        } else if (author instanceof Alumni) {
                            response.setAuthorUsername(((Alumni) author).getUsername());
                        } else if (author instanceof Admin) {
                            response.setAuthorUsername(((Admin) author).getUsername());
                        }

                        byte[] profilePictureBytes = userService.getProfilePictureById(getAuthorId(author));  // Implement getAuthorId to fetch the author ID
                        if (profilePictureBytes != null && profilePictureBytes.length > 0) {
                            String base64ProfilePicture = Base64.getEncoder().encodeToString(profilePictureBytes);
                            response.setAuthorPhoto(base64ProfilePicture);
                        }
                    }

                    byte[] photoBytes = postService.getPostPhotoById(post.getPostId());
                    if (photoBytes != null && photoBytes.length > 0) {
                        String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
                        response.setPhoto(base64Photo);
                    }
                    return response;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(postResponses, HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestParam String content, @RequestParam(required = false) MultipartFile image) {
        try {
            Post post = postService.createPost(content, image);
            return new ResponseEntity<>(post, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/like/{postId}")
    public ResponseEntity<Post> likePost(@PathVariable String postId) {
        String userId = postService.getLoggedInUserId();
        Post likedPost = postService.likePost(postId, userId);
        if (likedPost != null) {
            return ResponseEntity.ok(likedPost);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/comment/{postId}")
    public ResponseEntity<Post> addComment(@PathVariable String postId, @RequestParam String text) {
        String userId = postService.getLoggedInUserId();
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

    @GetMapping("/comments/{postId}")
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

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable String postId) {
        boolean isDeleted = postService.deletePost(postId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private String getAuthorId(Object author) {
        if (author instanceof Student) {
            return ((Student) author).getId();
        } else if (author instanceof Alumni) {
            return ((Alumni) author).getId();
        } else if (author instanceof Admin) {
            return ((Admin) author).getId();
        }
        return null;
    }
}
