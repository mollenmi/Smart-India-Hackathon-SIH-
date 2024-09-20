package com.hackathon.backend.model;

import com.hackathon.backend.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Community {

    @Id
    private String communityId;
    private String name;
    private String description;

    private List<User> members = new ArrayList<>();

    public void addMember(User user) {
        if (!members.stream().anyMatch(u -> u.getId().equals(user.getId()))) {
            members.add(user);
        }
    }

    public void removeMember(User user) {
        if (!members.stream().anyMatch(u -> u.getId().equals(user.getId()))) {
            members.remove(user);
        }
    }

    public void removeAllMembers() {
        members.clear();
    }
}
