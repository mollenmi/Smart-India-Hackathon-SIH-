package com.hackathon.backend.service;

import com.hackathon.backend.model.Post;
import com.hackathon.backend.repository.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostService {

    public final PostRepo postRepo;
    public final GridFSService gridFSService;

    public Post createPost(Post post, MultipartFile image) throws IOException {
        if(image != null && !image.isEmpty()) {
            String imageId = gridFSService.storeFile(image);
            post.setImageId(imageId);
        }
        post.setCreatedAt(LocalDateTime.now());
        return postRepo.save(post);
    }
}
