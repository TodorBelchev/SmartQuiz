package com.SmartQuiz.api.model.dto;

import com.SmartQuiz.api.model.entity.QuestionEntity;

import javax.validation.Valid;
import java.util.Collection;

public class AddQuizDTO {

    private String title;

    private Long creator;

    @Valid
    private Collection<QuestionDTO> questions;

    private String category;

    public AddQuizDTO() {
    }

    public AddQuizDTO(String title, Long creator, Collection<QuestionDTO> questions, String category) {
        this.title = title;
        this.creator = creator;
        this.questions = questions;
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }

    public Collection<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(Collection<QuestionDTO> questions) {
        this.questions = questions;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
