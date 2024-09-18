package com.hackathon.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.hackathon.backend.exception.ChatException;
import com.hackathon.backend.exception.MessageException;
import com.hackathon.backend.exception.UserException;
import com.hackathon.backend.model.Chat;
import com.hackathon.backend.model.Message;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.repository.MessageRepo;
import com.hackathon.backend.request.SendMessageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

    private MessageRepo messageRepo;

    private UserService userService;

    private ChatService chatService;

    private SimpMessagingTemplate messagingTemplate;

    public Message sendMessage(SendMessageRequest req) throws UserException, ChatException {
        User user = this.userService.findUserById(req.getUserId());
        Chat chat = this.chatService.findChatById(req.getChatId());

        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(req.getContent());
        message.setTimestamp(LocalDateTime.now());

        message = this.messageRepo.save(message);

        // Send message to WebSocket topic based on chat type
        if (chat.isGroup()) {
            messagingTemplate.convertAndSend("/group/" + chat.getId(), message);
        } else {
            messagingTemplate.convertAndSend( "/user/" + chat.getId(), message);
        }

        return message;
    }

    public List<Message> getChatsMessages(String chatId, User reqUser) throws ChatException, UserException {

        Chat chat = this.chatService.findChatById(chatId);

        if (!chat.getUsers().contains(reqUser)) {
            throw new UserException("You are not related to this chat");
        }

        List<Message> messages = this.messageRepo.findByChatId(chat.getId());

        return messages;

    }

    public Message findMessageById(String messageId) throws MessageException {
        Message message = this.messageRepo.findById(messageId)
                .orElseThrow(() -> new MessageException("The required message is not found"));
        return message;
    }

    public void deleteMessage(String messageId, User reqUser) throws MessageException {
        Message message = this.messageRepo.findById(messageId)
                .orElseThrow(() -> new MessageException("The required message is not found"));

        if (message.getUser().getId() == reqUser.getId()) {
            this.messageRepo.delete(message);
        } else {
            throw new MessageException("You are not authorized for this task");
        }
    }

}