package com.SmartQuiz.api.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity {

    @Column(unique = true)
    @Size(min = 3, max = 20)
    private String username;

    @Email
    private String email;

    @Column
    @Size(min = 3)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<RoleEntity> roles;

    @OneToMany(fetch = FetchType.EAGER)
    private Collection<QuizEntity> completedQuizzes;

    public UserEntity() {
    }

    public UserEntity(String username, String email, String password, Collection<RoleEntity> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.completedQuizzes = new ArrayList<>();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Collection<RoleEntity> roles) {
        this.roles = roles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<QuizEntity> getCompletedQuizzes() {
        return completedQuizzes;
    }

    public void setCompletedQuizzes(Collection<QuizEntity> completedQuizzes) {
        this.completedQuizzes = completedQuizzes;
    }
}
