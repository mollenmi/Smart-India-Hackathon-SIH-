package com.hackathon.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Comment {

    @Id
    private String id;
    private String postId;
    private String userId;
    private String content;
    @CreatedDate
    private Long createdAt;

    private String parentCommentId;
    private List<Comment> replies = new ArrayList<>();

    public Comment(String userId, String content) {
        this.userId = userId;
        this.content = content;
        this.createdAt = System.currentTimeMillis();
    }
}
