package com.hackathon.backend.model.post;

import com.hackathon.backend.model.user.Admin;
import com.hackathon.backend.model.user.Alumni;
import com.hackathon.backend.model.user.Student;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Document
public class Post {

    @Id
    private String postId;
    private String content;
    private Student student;
    private Alumni alumni;
    private Admin admin;
    private String userId;
    private String username;
    private String communityId;
    private List<String> likedBy = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();
    private long createdAt;
    private byte[] image;

    public Post() {
        this.createdAt = System.currentTimeMillis();
    }

    public Post(String content, byte[] image) {
        this.content = content;
        this.createdAt = System.currentTimeMillis();
        this.image = image;
    }

    public String getImageBase64() {
        return image != null ? Base64.getEncoder().encodeToString(image) : null;
    }
}