package com.hackathon.backend.service;

import java.util.List;

import com.hackathon.backend.exception.ChatException;
import com.hackathon.backend.exception.UserNotFoundException;
import com.hackathon.backend.model.Chat;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.repository.ChatRepo;
import com.hackathon.backend.request.GroupChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private UserService userService;

    private ChatRepo chatRepo;

    public Chat createChat(User reqUser, String userId) throws UserNotFoundException {

        User user = this.userService.findUserById(userId);

        Chat isChatExist = this.chatRepo.findSingleChatByUserIds(user, reqUser);

        System.out.println(isChatExist);
        if (isChatExist != null) {
            return isChatExist;
        }

        Chat chat = new Chat();
        chat.setCreatedBy(reqUser);
        chat.getUsers().add(user);
        chat.getUsers().add(reqUser);
        chat.setGroup(false);

        chat = this.chatRepo.save(chat);

        return chat;
    }

    public Chat findChatById(String chatId) throws ChatException {
        return this.chatRepo.findById(chatId)
                .orElseThrow(() -> new ChatException("The requested chat is not found"));
    }

    public List<Chat> findAllChatByUserId(String userId) throws UserNotFoundException {
        User user = this.userService.findUserById(userId);

        List<Chat> chats = this.chatRepo.findChatByUserId(user.getId());

        return chats;
    }

    public Chat createGroup(GroupChatRequest req, User reqUser) throws UserNotFoundException {
        Chat group = new Chat();
        group.setGroup(true);
        group.setChatImage(req.getChatImage());
        group.setChatName(req.getChatName());
        group.setCreatedBy(reqUser);
        group.getAdmins().add(reqUser);

        for (String userId : req.getUserIds()) {
            User user = this.userService.findUserById(userId);
            group.getUsers().add(user);
        }

        group = this.chatRepo.save(group);
        return group;
    }

    public Chat addUserToGroup(String userId, String chatId, User reqUser) throws UserNotFoundException, ChatException {
        Chat chat = this.chatRepo.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found"));

        User user = this.userService.findUserById(userId);

        if (chat.getAdmins().contains((reqUser))) {
            chat.getUsers().add(user);
            return chat;
        } else {
            throw new ChatException("You have not access to add user");
        }
    }

    public Chat renameGroup(String chatId, String groupName, User reqUser) throws ChatException, UserNotFoundException {
        Chat chat = this.chatRepo.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found"));

        if (chat.getUsers().contains(reqUser)) {
            chat.setChatName(groupName);
            return this.chatRepo.save(chat);
        } else {
            throw new UserNotFoundException("You are not the user");
        }
    }

    public Chat removeFromGroup(String chatId, String userId, User reqUser) throws UserNotFoundException, ChatException {
        Chat chat = this.chatRepo.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found"));

        User user = this.userService.findUserById(userId);

        if (chat.getAdmins().contains((reqUser))) {
            chat.getUsers().remove(user);
            return chat;
        } else if (chat.getUsers().contains(reqUser)) {
            if (user.getId() == reqUser.getId()) {
                chat.getUsers().remove(user);
                return this.chatRepo.save(chat);
            }

        }
        throw new ChatException("You have not access to remove user");

    }

    public void deleteChat(String chatId, String userId) throws ChatException, UserNotFoundException {
        Chat chat = this.chatRepo.findById(chatId)
                .orElseThrow(() -> new ChatException("The expected chat is not found while deleteing"));
        this.chatRepo.delete(chat);
    }

}