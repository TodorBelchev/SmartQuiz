package com.SmartQuiz.api.controller;

import com.SmartQuiz.api.model.dto.AddRoleToUserDTO;
import com.SmartQuiz.api.model.dto.UserRegisterDTO;
import com.SmartQuiz.api.model.entity.UserEntity;
import com.SmartQuiz.api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserEntity>> getUsers() {
        // should add pagination
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/register")
    public ResponseEntity<UserEntity> registerUser(@RequestBody @Valid UserRegisterDTO userRegisterDTO,
                                                   BindingResult bindingResult) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/register").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(userRegisterDTO, bindingResult));
    }

    @PostMapping("/role/addToUser")
    public ResponseEntity<Void> saveRole(@RequestBody @Valid AddRoleToUserDTO addRoleToUserDTO) {
        userService.addRoleToUser(addRoleToUserDTO);
        return ResponseEntity.ok().build();
    }
}
