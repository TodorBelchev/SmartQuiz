package com.SmartQuiz.api.model.dto;

import java.util.List;

public class EnrollQuizDTO {

    List<EnrollResponseDTO> responses;

    public List<EnrollResponseDTO> getResponses() {
        return responses;
    }

    public void setResponses(List<EnrollResponseDTO> responses) {
        this.responses = responses;
    }
}
