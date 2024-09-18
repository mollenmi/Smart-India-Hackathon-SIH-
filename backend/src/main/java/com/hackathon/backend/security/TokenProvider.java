package com.hackathon.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class TokenProvider {

    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication authentication) {

        String jwt = Jwts.builder().setIssuer("Faiz")
                .setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("username", authentication.getName())
                .signWith(key)
                .compact();

        return jwt;
    }

    public String getUsernameFromToken(String jwt) {
        jwt = jwt.substring(7);
        Claims claim = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        String username = String.valueOf(claim.get("username"));
        return username;
    }

}