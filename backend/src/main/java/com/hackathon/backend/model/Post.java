package com.hackathon.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Post {

    @Id
    private String postId;
    private String content;
    private String imageId;
    private String userId;
    private LocalDateTime createdAt;
    private List<String> likes = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();
    private int likeCount = 0;
    private int commentCount = 0;
}

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class Comment {

    private String commentId;
    private String userId;
    private String text;
    private LocalDateTime commentedAt;
}
