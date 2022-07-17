package com.SmartQuiz.api.model.dto;


import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;

public class QuestionDTO {

    private Long id;

    @Size(min = 5, max = 255, message = "Question must be between 5 and 255 characters!")
    private String text;

    @NotBlank(message = "Correct response must not be blank!")
    private String correctResponse;

    @Valid
    private Collection<ResponseDTO> responses;

    public QuestionDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCorrectResponse() {
        return correctResponse;
    }

    public void setCorrectResponse(String correctResponse) {
        this.correctResponse = correctResponse;
    }

    public Collection<ResponseDTO> getResponses() {
        return responses;
    }

    public void setResponses(Collection<ResponseDTO> responses) {
        this.responses = responses;
    }
}
