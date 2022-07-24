package com.SmartQuiz.api.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "questions")
public class QuestionEntity extends BaseEntity {

    @Column
    @Size(min = 5, max = 255)
    private String text;

    @Column
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ResponseEntity> responses;

    private Long correctResponse;

    public QuestionEntity() {
    }

    public QuestionEntity(String text, Set<ResponseEntity> responses, Long correctResponse) {
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

    public Set<ResponseEntity> getResponses() {
        return responses;
    }

    public void setResponses(Set<ResponseEntity> responses) {
        this.responses = responses;
    }

    public Long getCorrectResponse() {
        return correctResponse;
    }

    public void setCorrectResponse(Long correctResponse) {
        this.correctResponse = correctResponse;
    }

    @Override
    public int hashCode() {
        return Objects.hash(text, responses, correctResponse, super.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        QuestionEntity that = (QuestionEntity) o;
        return super.equals(o) && Objects.equals(text, that.getText()) && Objects.equals(responses, that.responses)
                && Objects.equals(correctResponse, that.correctResponse);
    }
}
