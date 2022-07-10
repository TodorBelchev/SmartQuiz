package com.SmartQuiz.api.model.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "quizzes")
public class QuizEntity extends BaseEntity {

    @Column
    @Size(min = 5, max = 255)
    private String title;

    @Column
    @NotNull
    private Long duration;

    @OneToMany(fetch = FetchType.EAGER)
    private Collection<QuestionEntity> questions;

    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity creator;

    @OneToMany(fetch = FetchType.EAGER)
    private Collection<QuizResultEntity> results;

    @OneToOne(fetch = FetchType.EAGER)
    private CategoryEntity category;

    public QuizEntity() {
    }

    public QuizEntity(String title, Collection<QuestionEntity> questions, UserEntity creator, CategoryEntity category, Long duration) {
        this.title = title;
        this.questions = questions;
        this.creator = creator;
        this.category = category;
        this.results = new ArrayList<>();
        this.duration = duration;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Collection<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(Collection<QuestionEntity> questions) {
        this.questions = questions;
    }

    public UserEntity getCreator() {
        return creator;
    }

    public void setCreator(UserEntity creator) {
        this.creator = creator;
    }

    public Collection<QuizResultEntity> getResults() {
        return results;
    }

    public void setResults(Collection<QuizResultEntity> results) {
        this.results = results;
    }

    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }
}
