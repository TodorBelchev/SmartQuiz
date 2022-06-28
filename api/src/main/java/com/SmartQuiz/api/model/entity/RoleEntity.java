package com.SmartQuiz.api.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "roles")
public class RoleEntity extends BaseEntity {

    @Column
    @Size(min = 3, max = 20)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
