package com.SmartQuiz.api.model.dto;

import java.util.Collection;

public class QuestionViewDTO {

    private Long id;

    private String text;

    private String correctResponse;

    private Collection<ResponseDTO> responses;

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
