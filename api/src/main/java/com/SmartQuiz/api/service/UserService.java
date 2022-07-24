package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.dto.AddRoleToUserDTO;
import com.SmartQuiz.api.model.dto.UserRegisterDTO;
import com.SmartQuiz.api.model.entity.RoleEntity;
import com.SmartQuiz.api.model.entity.UserEntity;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface UserService {
    UserEntity saveUser(UserRegisterDTO user, BindingResult bindingResult);

    RoleEntity saveRole(RoleEntity role);

    void addRoleToUser(AddRoleToUserDTO addRoleToUserDTO);

    UserEntity getUser(String username);

    UserEntity getById(Long id);

    List<UserEntity> getUsers();

    void init();

    UserEntity getByEmail(String email);

    UserEntity getByUsername(String username);
}
