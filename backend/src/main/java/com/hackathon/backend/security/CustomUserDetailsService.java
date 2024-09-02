package com.hackathon.backend.security;

import com.hackathon.backend.repository.AdminRepo;
import com.hackathon.backend.repository.AlumniRepo;
import com.hackathon.backend.repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final StudentRepo studentRepo;
    private final AlumniRepo alumniRepo;
    private final AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = studentRepo.findByUsername(username);
        if(user == null) {
            user = alumniRepo.findByUsername(username);
        }
        if(user == null) {
            user = adminRepo.findByUsername(username);
        }
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }
}
