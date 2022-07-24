package com.SmartQuiz.api.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.Objects;

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

    @Override
    public int hashCode() {
        return Objects.hash(text, super.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o){
            return true;
        }
        if (o == null || getClass() != o.getClass()){
            return false;
        }
        ResponseEntity that = (ResponseEntity) o;
        return Objects.equals(text, that.text) && super.equals(o);
    }
}
