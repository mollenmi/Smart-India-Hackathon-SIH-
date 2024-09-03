package com.hackathon.backend.security.user;

import com.hackathon.backend.model.User;
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
        User user = studentRepo.findByUsername(username)
                .orElseGet(() -> alumniRepo.findByUsername(username)
                        .orElseGet(() -> adminRepo.findByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"))));

        return CustomUserDetails.buildUserDetails(user);
    }
}
