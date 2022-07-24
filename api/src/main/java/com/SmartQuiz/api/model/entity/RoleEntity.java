package com.SmartQuiz.api.model.entity;

import com.SmartQuiz.api.model.enums.RoleEnum;

import javax.persistence.*;
import java.util.Objects;

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

    @Override
    public int hashCode() {
        return Objects.hash(name, super.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RoleEntity that = (RoleEntity) o;
        return super.equals(o) && Objects.equals(name, that.name);
    }
}
