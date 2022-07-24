package com.SmartQuiz.api.controller;

import com.SmartQuiz.api.model.dto.AddRoleToUserDTO;
import com.SmartQuiz.api.model.dto.UserRegisterDTO;
import com.SmartQuiz.api.model.dto.UserViewDTO;
import com.SmartQuiz.api.model.entity.UserEntity;
import com.SmartQuiz.api.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserViewDTO>> getUsers() {
        // should add pagination
        List<UserViewDTO> users = userService.getUsers().stream().map(u -> modelMapper.map(u, UserViewDTO.class)).collect(Collectors.toList());
        return ResponseEntity.ok().body(users);
    }

    @PostMapping("/register")
    public ResponseEntity<UserViewDTO> registerUser(@RequestBody @Valid UserRegisterDTO userRegisterDTO,
                                                   BindingResult bindingResult) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/register").toUriString());
        return ResponseEntity.created(uri).body(modelMapper.map(userService.saveUser(userRegisterDTO, bindingResult), UserViewDTO.class));
    }

    @PostMapping("/role/addToUser")
    public ResponseEntity<Void> saveRole(@RequestBody @Valid AddRoleToUserDTO addRoleToUserDTO) {
        userService.addRoleToUser(addRoleToUserDTO);
        return ResponseEntity.ok().build();
    }
}
