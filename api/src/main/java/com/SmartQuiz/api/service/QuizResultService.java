package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.entity.QuizResultEntity;

public interface QuizResultService {
    QuizResultEntity getByUserId(Long id);

    QuizResultEntity save(QuizResultEntity quizResultEntity);
}
