package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.dto.AddRoleToUserDTO;
import com.SmartQuiz.api.model.dto.UserRegisterDTO;
import com.SmartQuiz.api.model.entity.RoleEntity;
import com.SmartQuiz.api.model.entity.UserEntity;
import com.SmartQuiz.api.model.enums.RoleEnum;
import com.SmartQuiz.api.repo.RoleRepo;
import com.SmartQuiz.api.repo.UserRepo;
import com.SmartQuiz.api.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo userRepo, RoleRepo roleRepo, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserEntity saveUser(UserRegisterDTO user) {
        UserEntity userEntity = modelMapper.map(user, UserEntity.class);
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(userEntity);
    }

    @Override
    public RoleEntity saveRole(RoleEntity role) {
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(AddRoleToUserDTO addRoleToUserDTO) {
        UserEntity user = userRepo.findByUsername(addRoleToUserDTO.getUsername());
        RoleEntity role = roleRepo.findByName(addRoleToUserDTO.getRoleName());
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

    @Override
    @Transactional
    public void init() {
        if (userRepo.count() != 0) {
            return;
        }

        UserEntity user = new UserEntity("Admin",
                "admin",
                "admin@abv.bg",
                passwordEncoder.encode("123"),
                new ArrayList<>());

        List<RoleEntity> roles = roleRepo.findAll();

        user.getRoles().addAll(roles);
        userRepo.save(user);
    }
}
