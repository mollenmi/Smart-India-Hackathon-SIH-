package com.hackathon.backend.controller;

import java.util.List;

import com.hackathon.backend.exception.ChatException;
import com.hackathon.backend.exception.UserException;
import com.hackathon.backend.model.Chat;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.request.GroupChatRequest;
import com.hackathon.backend.request.SingleChatRequest;
import com.hackathon.backend.response.ApiResponse;
import com.hackathon.backend.service.ChatService;
import com.hackathon.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chats")
public class ChatController {

    private ChatService chatService;

    private UserService userService;

    @PostMapping("/single")
    public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatRequest singleChatRequest,
                                                  @RequestHeader("Authorization") String jwt) throws UserException {

        User reqUser = this.userService.findUserProfile(jwt);

        Chat chat = this.chatService.createChat(reqUser, singleChatRequest.getUserId());

        return new ResponseEntity<Chat>(chat, HttpStatus.CREATED);
    }

    @PostMapping("/group")
    public ResponseEntity<Chat> createGroupHandler(@RequestBody GroupChatRequest groupChatRequest,
                                                   @RequestHeader("Authorization") String jwt) throws UserException {

        System.out.println(groupChatRequest);
        User reqUser = this.userService.findUserProfile(jwt);

        Chat chat = this.chatService.createGroup(groupChatRequest, reqUser);

        return new ResponseEntity<Chat>(chat, HttpStatus.CREATED);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> findChatByIdHandler(@PathVariable String chatId) throws ChatException {

        Chat chat = this.chatService.findChatById(chatId);

        return new ResponseEntity<Chat>(chat, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Chat>> findChatByUserIdHandler(@RequestHeader("Authorization") String jwt)
            throws UserException {

        User reqUser = this.userService.findUserProfile(jwt);

        List<Chat> chats = this.chatService.findAllChatByUserId(reqUser.getId());

        return new ResponseEntity<List<Chat>>(chats, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/add/{userId}")
    public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable String chatId,
                                                      @PathVariable String userId, @RequestHeader("Authorization") String jwt)
            throws UserException, ChatException {

        User reqUser = this.userService.findUserProfile(jwt);

        Chat chat = this.chatService.addUserToGroup(userId, chatId, reqUser);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/remove/{userId}")
    public ResponseEntity<Chat> removeUserFromGroupHandler(@PathVariable String chatId,
                                                           @PathVariable String userId, @RequestHeader("Authorization") String jwt)
            throws UserException, ChatException {

        User reqUser = this.userService.findUserProfile(jwt);

        Chat chat = this.chatService.removeFromGroup(userId, chatId, reqUser);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{chatId}")
    public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable String chatId,
                                                         @RequestHeader("Authorization") String jwt)
            throws UserException, ChatException {

        User reqUser = this.userService.findUserProfile(jwt);

        this.chatService.deleteChat(chatId, reqUser.getId());

        ApiResponse res = new ApiResponse("Deleted Successfully...", false);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}