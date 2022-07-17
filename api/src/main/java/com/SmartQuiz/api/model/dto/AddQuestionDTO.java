package com.SmartQuiz.api.model.dto;

public class AddQuestionDTO {

    private QuestionDTO question;

    private Long quizId;

    public QuestionDTO getQuestion() {
        return question;
    }

    public void setQuestion(QuestionDTO question) {
        this.question = question;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }
}
