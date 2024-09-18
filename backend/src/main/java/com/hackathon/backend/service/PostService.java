package com.hackathon.backend.service;

import com.hackathon.backend.exception.ResourceNotFoundException;
import com.hackathon.backend.model.Comment;
import com.hackathon.backend.model.post.Post;
import com.hackathon.backend.repository.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepo postRepo;
    private final UserService userService;

    public Page<Post> getFeed(Pageable pageable) {
        return postRepo.findAll(pageable);
    }

    public Post createPost(String content, MultipartFile image) throws IOException, SQLException {

        String userId = getLoggedInUserId();
//        String communityId = userService.deriveCommunityIdForUser(userId);

        Post post = new Post();
        post.setContent(content);
        if (image != null && !image.isEmpty()) {
            post.setImage(image.getBytes());  // Store the image bytes directly
        }
//        post.setCommunityId(communityId);
        post.setUserId(userId);
        post.setCreatedAt(System.currentTimeMillis());

        return postRepo.save(post);
    }

    public byte[] getPostPhotoById(String postId) {
        Optional<Post> post = postRepo.findById(postId);
        if (post.isEmpty()) {
            throw new ResourceNotFoundException("Post not found");
        }
        byte[] photoBytes = post.get().getImage();
        if (photoBytes != null) {
            return photoBytes;
        }
        return null;
    }

    public Post getPostById(String postId) {
        return postRepo.findById(postId).orElse(null);
    }

    public String getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return ((UserDetails) principal).getUsername();
            } else {
                return principal.toString();
            }
        }
        return null;
    }

    public Post likePost(String postId, String userId) {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            if (!post.getLikedBy().contains(userId)) {
                post.getLikedBy().add(userId);
            }
            return postRepo.save(post);
        }
        return null;
    }

    public Post addComment(String postId, String userId, String commentText) {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            Comment comment = new Comment(userId, commentText);
            post.getComments().add(comment);
            return postRepo.save(post);
        }
        return null;
    }

    public boolean deletePost(String postId) {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            postRepo.delete(post);
            return true;
        }
        return false;
    }

    public long getNumberOfLikes(String postId) {
        Optional<Post> postOptional = postRepo.findById(postId);
        return postOptional.map(post -> post.getLikedBy().size()).orElse(0);
    }

    public long getNumberOfComments(String postId) {
        Optional<Post> postOptional = postRepo.findById(postId);
        return postOptional.map(post -> post.getComments().size()).orElse(0);
    }
}
