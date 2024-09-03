package com.hackathon.backend.model;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface User {
    String getId();
    String getUsername();
    String getPassword();
    Collection<Role> getRoles();
}
