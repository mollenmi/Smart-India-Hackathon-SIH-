package com.hackathon.backend.controller;

import com.hackathon.backend.model.Community;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/communities")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping("/create")
    public ResponseEntity<Community> createCommunity(@RequestParam String name) {
        Community community = communityService.createCommunity(name);
        return ResponseEntity.status(HttpStatus.CREATED).body(community);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Community> deleteCommunity(@RequestParam String id) {
        communityService.deleteCommunity(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinCommunity(@RequestParam String userId, @RequestParam String communityId) {
        communityService.joinCommunity(userId, communityId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/leave")
    public ResponseEntity<?> leaveCommunity(@RequestParam String userId, @RequestParam String communityId) {
        communityService.leaveCommunity(userId, communityId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all-communities")
    public ResponseEntity<List<Community>> getAllCommunities() {
        List<Community> communities = communityService.getAllCommunities();
        return ResponseEntity.ok().body(communities);
    }

    @GetMapping("/community/users")
    public ResponseEntity<List<User>> getUsersInCommunity(@RequestParam String communityId) {
        List<User> users = communityService.getAllUsersInCommunity(communityId);
        return ResponseEntity.ok().body(users);
    }
}
