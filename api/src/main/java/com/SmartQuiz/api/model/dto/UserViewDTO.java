package com.SmartQuiz.api.model.dto;

import com.SmartQuiz.api.model.entity.RoleEntity;
import java.util.Collection;

public class UserViewDTO {

    private String username;

    private String email;

    private Collection<RoleEntity> roles;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Collection<RoleEntity> roles) {
        this.roles = roles;
    }
}
