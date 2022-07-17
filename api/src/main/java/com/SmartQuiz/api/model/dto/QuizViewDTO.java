package com.SmartQuiz.api.model.dto;

import com.SmartQuiz.api.model.entity.CategoryEntity;
import com.SmartQuiz.api.model.entity.QuestionEntity;
import com.SmartQuiz.api.model.entity.QuizResultEntity;
import com.SmartQuiz.api.model.entity.UserEntity;

import java.util.Collection;

public class QuizViewDTO {

    private Long id;

    private String title;

    private Long duration;

    private Collection<QuestionEntity> questions;

    private UserEntity creator;

    private Collection<QuizResultEntity> results;

    private CategoryEntity category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
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
}
