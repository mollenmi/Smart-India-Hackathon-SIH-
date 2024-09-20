package com.hackathon.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.hackathon.backend.model.Message;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface MessageRepo extends MongoRepository<Message, String> {

    @Query("{ 'chat.id': ?0 }")
    List<Message> findByChatId(String chatId);

}
