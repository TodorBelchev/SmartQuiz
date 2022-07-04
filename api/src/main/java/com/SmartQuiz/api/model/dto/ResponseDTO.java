package com.SmartQuiz.api.model.dto;

import javax.validation.constraints.Size;

public class ResponseDTO {

    private Long id;

    @Size(min = 1, max = 255, message = "Response must be between 1 and 255 characters!")
    private String text;

    public ResponseDTO() {
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
}
