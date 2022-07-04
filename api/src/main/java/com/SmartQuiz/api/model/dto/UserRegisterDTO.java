package com.SmartQuiz.api.model.dto;

import com.SmartQuiz.api.model.validator.UniqueEmail;
import com.SmartQuiz.api.model.validator.UniqueUsername;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserRegisterDTO {

    @NotBlank
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters!")
    @UniqueUsername(message = "Username: '${validatedValue}' is already registered!")
    private String username;

    @NotBlank
    @Email(message = "Enter a valid email please!")
    @UniqueEmail(message = "Email: '${validatedValue}' is already registered!")
    private String email;

    @NotBlank
    @Size(min = 3, max = 20, message = "Password must be between 3 and 20 characters!")
    private String password;

    @NotBlank
    @Size(min = 3, max = 20, message = "Confirm password must be between 3 and 20 characters!")
    private String confirmPassword;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
