package com.hackathon.backend.model.user;

import java.util.Collection;

public interface User {
    String getId();
    String getUsername();
    String getPassword();
    Collection<Role> getRoles();
}
