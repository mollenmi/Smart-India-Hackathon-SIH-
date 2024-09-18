package com.hackathon.backend.model;

import java.time.LocalDateTime;

import com.hackathon.backend.model.user.User;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document
public class Message {

    @Id
    private Integer id;
    private String content;
    private LocalDateTime timestamp;

    @DBRef
    private Chat chat;

    @DBRef
    private User user;
}