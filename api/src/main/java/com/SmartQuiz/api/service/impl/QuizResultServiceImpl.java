package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.entity.QuizResultEntity;
import com.SmartQuiz.api.repo.QuizResultRepo;
import com.SmartQuiz.api.service.QuizResultService;
import org.springframework.stereotype.Service;

@Service
public class QuizResultServiceImpl implements QuizResultService {

    private final QuizResultRepo quizResultRepo;

    public QuizResultServiceImpl(QuizResultRepo quizResultRepo) {
        this.quizResultRepo = quizResultRepo;
    }

    @Override
    public QuizResultEntity getByUserId(Long id) {
        return quizResultRepo.findByUserId(id);
    }

    @Override
    public QuizResultEntity save(QuizResultEntity quizResultEntity) {
        return quizResultRepo.save(quizResultEntity);
    }
}
