package com.hackathon.backend.service;

import com.hackathon.backend.model.Message;
import com.hackathon.backend.repository.MessageRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private MessageRepo messageRepo;

    public Message sendMessage(String senderId, String receiverId, String content) {
        Message message = new Message(senderId, receiverId, content);
        return messageRepo.save(message);
    }

    public List<Message> getConversation(String senderId, String receiverId) {
        return messageRepo.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    public List<Message> getUnreadMessages(String receiverId) {
        return messageRepo.findByReceiverIdAndReadIsFalse(receiverId);
    }

    public void markMessagesAsRead(List<Message> messages) {
        for (Message message : messages) {
            message.setRead(true);
            messageRepo.save(message);
        }
    }
}
