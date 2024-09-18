package com.hackathon.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SendMessageRequest {
    private String userId;
    private String chatId;
    private String content;
}
