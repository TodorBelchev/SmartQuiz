package com.SmartQuiz.api.model.dto;

public class ResponseDTO {

    private Long id;

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
