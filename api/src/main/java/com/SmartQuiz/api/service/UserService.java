package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.entity.RoleEntity;
import com.SmartQuiz.api.model.entity.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity saveUser(UserEntity user);

    RoleEntity saveRole(RoleEntity role);

    void addRoleToUser(String username, String roleName);

    UserEntity getUser(String username);

    List<UserEntity> getUsers();
}
