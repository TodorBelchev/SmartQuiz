package com.SmartQuiz.api.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "responses")
public class ResponseEntity extends BaseEntity {

    @Column
    @Size(min = 1, max = 255)
    private String text;

    public ResponseEntity() {
    }

    public ResponseEntity(String response) {
        this.text = response;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
