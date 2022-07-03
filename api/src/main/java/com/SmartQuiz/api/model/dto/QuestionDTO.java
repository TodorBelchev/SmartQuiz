package com.SmartQuiz.api.model.dto;

import javax.validation.Valid;
import java.util.Collection;

public class QuestionDTO {

    private String text;

    private String correctResponse;

    @Valid
    private Collection<ResponseDTO> responses;

    public QuestionDTO() {
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
