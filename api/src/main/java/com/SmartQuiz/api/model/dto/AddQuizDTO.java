package com.SmartQuiz.api.model.dto;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;

public class AddQuizDTO {

    @Size(min = 5, max = 255, message = "Quiz title must be between 5 and 255 characters!")
    private String title;

    @NotNull(message = "Creator is required!")
    private Long creator;

    @Valid
    private Collection<QuestionDTO> questions;

    @NotBlank(message = "Category is required!")
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
