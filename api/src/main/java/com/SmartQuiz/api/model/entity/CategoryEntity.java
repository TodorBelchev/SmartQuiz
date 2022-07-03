package com.SmartQuiz.api.model.entity;

import com.SmartQuiz.api.model.enums.QuizCategoryEnum;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@Entity
@Table(name = "categories")
public class CategoryEntity extends BaseEntity {

    @Enumerated(value = EnumType.STRING)
    private QuizCategoryEnum name;

    public CategoryEntity() {
    }

    public CategoryEntity(QuizCategoryEnum name) {
        this.name = name;
    }

    public QuizCategoryEnum getName() {
        return name;
    }

    public void setName(QuizCategoryEnum name) {
        this.name = name;
    }
}
