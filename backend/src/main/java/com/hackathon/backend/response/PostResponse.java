package com.hackathon.backend.response;

import com.hackathon.backend.model.post.Post;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostResponse {
    private Post post;
    private String photo;
    private String authorUsername;
    private String authorPhoto;
}
