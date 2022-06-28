package com.SmartQuiz.api.model.dto;

import com.SmartQuiz.api.model.validator.ValidRoleEnum;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AddRoleToUserDTO {

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @ValidRoleEnum
    private String roleName;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
