package com.hackathon.backend.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.hackathon.backend.model.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "chats")
public class Chat {

    @Id
    private String id;
    private String chatName;
    private String chatImage;
    private boolean isGroup;

    @DBRef
    private Set<User> admins = new HashSet<>();

    @DBRef
    private User createdBy;

    @DBRef
    private Set<User> users = new HashSet<>();

    @DBRef
    private List<Message> messages = new ArrayList<>();
}
