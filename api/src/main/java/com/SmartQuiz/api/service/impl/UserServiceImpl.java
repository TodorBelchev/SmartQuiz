package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.entity.RoleEntity;
import com.SmartQuiz.api.model.entity.UserEntity;
import com.SmartQuiz.api.repo.RoleRepo;
import com.SmartQuiz.api.repo.UserRepo;
import com.SmartQuiz.api.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;

    public UserServiceImpl(UserRepo userRepo, RoleRepo roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        return userRepo.save(user);
    }

    @Override
    public RoleEntity saveRole(RoleEntity role) {
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        UserEntity user = userRepo.findByUsername(username);
        RoleEntity role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
        userRepo.save(user);
    }

    @Override
    public UserEntity getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public List<UserEntity> getUsers() {
        return userRepo.findAll();
    }
}
