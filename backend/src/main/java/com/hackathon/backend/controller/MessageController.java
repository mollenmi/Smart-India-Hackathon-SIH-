package com.hackathon.backend.controller;

import com.hackathon.backend.model.Message;
import com.hackathon.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping("/send")
    public Message sendMessage(@RequestParam String senderId, @RequestParam String receiverId, @RequestParam String content) {
        return messageService.sendMessage(senderId, receiverId, content);
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam String senderId, @RequestParam String receiverId) {
        return messageService.getConversation(senderId, receiverId);
    }

    @GetMapping("/unread")
    public List<Message> getUnreadMessages(@RequestParam String receiverId) {
        return messageService.getUnreadMessages(receiverId);
    }

    @PostMapping("/markAsRead")
    public void markMessagesAsRead(@RequestBody List<Message> messages) {
        messageService.markMessagesAsRead(messages);
    }
}
