package com.hackathon.backend.repository;

import com.hackathon.backend.model.Community;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface CommunityRepo extends MongoRepository<Community, String> {
}
