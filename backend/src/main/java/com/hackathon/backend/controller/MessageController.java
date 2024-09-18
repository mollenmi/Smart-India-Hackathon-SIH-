package com.hackathon.backend.controller;

import java.util.List;

import com.hackathon.backend.exception.ChatException;
import com.hackathon.backend.exception.MessageException;
import com.hackathon.backend.exception.UserException;
import com.hackathon.backend.model.Message;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.request.SendMessageRequest;
import com.hackathon.backend.response.ApiResponse;
import com.hackathon.backend.service.MessageService;
import com.hackathon.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;

    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest sendMessageRequest,
                                                      @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User user = this.userService.findUserProfile(jwt);

        sendMessageRequest.setUserId(user.getId());

        Message message = this.messageService.sendMessage(sendMessageRequest);

        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<List<Message>> getChatMessageHandler(@PathVariable String chatId,
                                                               @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User user = this.userService.findUserProfile(jwt);

        List<Message> messages = this.messageService.getChatsMessages(chatId, user);

        return new ResponseEntity<List<Message>>(messages, HttpStatus.OK);
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessageHandler(@PathVariable String messageId,
                                                            @RequestHeader("Authorization") String jwt) throws UserException, ChatException, MessageException {

        User user = this.userService.findUserProfile(jwt);

        this.messageService.deleteMessage(messageId, user);

        ApiResponse res = new ApiResponse("Deleted successfully......", false);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}