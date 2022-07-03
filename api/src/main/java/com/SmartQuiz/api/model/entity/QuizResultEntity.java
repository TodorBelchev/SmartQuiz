package com.SmartQuiz.api.model.entity;

import jdk.jfr.Percentage;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "quiz_result")
public class QuizResultEntity extends BaseEntity {

    @OneToOne(fetch = FetchType.EAGER)
    private UserEntity user;

    @Column
    @Percentage
    private BigDecimal result;

    public QuizResultEntity() {
    }

    public QuizResultEntity(UserEntity user, BigDecimal result) {
        this.user = user;
        this.result = result;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public BigDecimal getResult() {
        return result;
    }

    public void setResult(BigDecimal result) {
        this.result = result;
    }
}
