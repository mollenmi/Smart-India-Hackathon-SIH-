package com.hackathon.backend.service;

import com.hackathon.backend.model.Community;
import com.hackathon.backend.model.user.User;
import com.hackathon.backend.repository.CommunityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepo communityRepo;
    private final UserService userService;

    public Community createCommunity(String name) {
        Community newCommunity = new Community();
        newCommunity.setName(name);
        return communityRepo.save(newCommunity);
    }

    public void deleteCommunity(String id) {
        Community community = communityRepo.findById(id).get();
        community.removeAllMembers();
        communityRepo.delete(community);
    }

    public void joinCommunity(String userId, String communityId) {
        User user = userService.findUserById(userId);
        Community community = communityRepo.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));

        if(!community.getMembers().contains(user)) {
            community.addMember(user);
            communityRepo.save(community);
        }
        else {
            throw new RuntimeException("User is already a member of this community");
        }
    }

    public void leaveCommunity(String userId, String communityId) {
        User user = userService.findUserById(userId);
        Community community = communityRepo.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));

        if(!community.getMembers().contains(user)) {
            community.removeMember(user);
            communityRepo.save(community);
        }
        else {
            throw new RuntimeException("User is already not a member of this community");
        }
    }

    public List<Community> getAllCommunities() {
        return communityRepo.findAll();
    }

    public List<User> getAllUsersInCommunity(String communityId) {
        Community community = communityRepo.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        return community.getMembers();
    }
}
