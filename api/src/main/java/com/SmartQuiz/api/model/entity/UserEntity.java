package com.SmartQuiz.api.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity{

    @Column
    @Size(min = 3, max = 20)
    private String name;

    @Column
    @Size(min = 3, max = 20)
    private String username;

    @Column
    @Size(min = 3, max = 20)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<RoleEntity> roles;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
