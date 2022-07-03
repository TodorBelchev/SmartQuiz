package com.SmartQuiz.api.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity
@Table(name = "questions")
public class QuestionEntity extends BaseEntity {

    @Column
    @Size(min = 10, max = 255)
    private String text;

    @Column
    @OneToMany(fetch = FetchType.EAGER)
    private Collection<ResponseEntity> responses;

    private Long correctResponse;

    public QuestionEntity() {
    }

    public QuestionEntity(String text, Collection<ResponseEntity> responses, Long correctResponse) {
        this.text = text;
        this.responses = responses;
        this.correctResponse = correctResponse;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Collection<ResponseEntity> getResponses() {
        return responses;
    }

    public void setResponses(Collection<ResponseEntity> responses) {
        this.responses = responses;
    }

    public Long getCorrectResponse() {
        return correctResponse;
    }

    public void setCorrectResponse(Long correctResponse) {
        this.correctResponse = correctResponse;
    }
}
