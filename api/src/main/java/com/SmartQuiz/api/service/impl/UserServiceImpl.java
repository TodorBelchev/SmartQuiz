package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.controller.errors.InvalidRegisterUserRequest;
import com.SmartQuiz.api.controller.errors.ResourceNotFound;
import com.SmartQuiz.api.model.dto.AddRoleToUserDTO;
import com.SmartQuiz.api.model.dto.UserRegisterDTO;
import com.SmartQuiz.api.model.entity.RoleEntity;
import com.SmartQuiz.api.model.entity.UserEntity;
import com.SmartQuiz.api.model.enums.RoleEnum;
import com.SmartQuiz.api.repo.RoleRepo;
import com.SmartQuiz.api.repo.UserRepo;
import com.SmartQuiz.api.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(roleEntity -> authorities.add(new SimpleGrantedAuthority(roleEntity.getName().name())));
        return new User(username, user.getPassword(), authorities);
    }

    @Override
    public UserEntity saveUser(UserRegisterDTO user, BindingResult bindingResult) {
        boolean passwordsMatch = user.getPassword().equals(user.getConfirmPassword());

        if (bindingResult.hasErrors() || !passwordsMatch) {
            List<String> errors = bindingResult.getAllErrors()
                    .stream()
                    .map(e -> String.format("%s", e.getDefaultMessage())).collect(Collectors.toList());

            if (!passwordsMatch) {
                errors.add("Passwords must match!");
            }

            throw new InvalidRegisterUserRequest(errors);
        }

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
    public UserEntity getById(Long id) {
        Optional<UserEntity> user = userRepo.findById(id);
        if (user.isEmpty()) {
            throw new ResourceNotFound(List.of(String.format("Resource with id: %d was not found!", id)));
        }
        return user.get();
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

        UserEntity user = new UserEntity(
                "admin",
                "admin@abv.bg",
                passwordEncoder.encode("123"),
                new ArrayList<>());

        List<RoleEntity> roles = roleRepo.findAll();

        user.getRoles().addAll(roles);
        userRepo.save(user);
    }
}
