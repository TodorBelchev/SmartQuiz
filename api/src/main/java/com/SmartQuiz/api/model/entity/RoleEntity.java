package com.SmartQuiz.api.model.entity;

import com.SmartQuiz.api.model.enums.RoleEnum;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class RoleEntity extends BaseEntity {

    @Enumerated(value = EnumType.STRING)
    private RoleEnum name;

    public RoleEntity() {
    }

    public RoleEntity(RoleEnum name) {
        this.name = name;
    }

    public RoleEnum getName() {
        return name;
    }

    public void setName(RoleEnum name) {
        this.name = name;
    }
}
