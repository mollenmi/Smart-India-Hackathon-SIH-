package com.hackathon.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GroupChatRequest {
    private List<String> userIds;
    private String chatName;
    private String chatImage;
}
