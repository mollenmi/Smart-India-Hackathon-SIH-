package com.hackathon.backend.repository;

import java.util.List;

import com.hackathon.backend.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.hackathon.backend.model.Chat;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface ChatRepo extends MongoRepository<Chat, String> {

    @Query("{ 'users.id': ?0 }")
    List<Chat> findChatByUserId(String userId);

    @Query("{ 'isGroup': false, 'users': { $all: [?0, ?1] } }")
    Chat findSingleChatByUserIds(User user, User reqUser);

}
