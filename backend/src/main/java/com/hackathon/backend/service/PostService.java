package com.hackathon.backend.service;

import com.hackathon.backend.model.Comment;
import com.hackathon.backend.model.Post;
import com.hackathon.backend.repository.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    public final PostRepo postRepo;
    public final GridFSService gridFSService;

    public Page<Post> getFeed(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return (Page<Post>) postRepo.findAllByOrderByCreatedAtDesc(pageRequest);
    }

    public Post createPost(String content, String imageId, String userId) {
        Post post = new Post(content, imageId, userId);
        return postRepo.save(post);
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

    public byte[] getPostImage(String imageId) throws IOException {
        return gridFSService.getFile(imageId);
    }

    public boolean deletePost(String postId) throws IOException {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            postRepo.delete(post);
            if (post.getImageId() != null) {
                gridFSService.deleteFile(post.getImageId());
            }
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