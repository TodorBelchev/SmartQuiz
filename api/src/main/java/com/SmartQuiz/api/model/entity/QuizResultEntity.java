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

    @OneToOne(fetch = FetchType.EAGER)
    private QuizEntity quiz;

    public QuizResultEntity() {
    }

    public QuizResultEntity(UserEntity user, BigDecimal result, QuizEntity quizEntity) {
        this.user = user;
        this.result = result;
        this.quiz = quizEntity;
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

    public QuizEntity getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizEntity quiz) {
        this.quiz = quiz;
    }
}
