package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.dto.QuestionDTO;
import com.SmartQuiz.api.model.entity.QuestionEntity;
import com.SmartQuiz.api.repo.QuestionRepo;
import com.SmartQuiz.api.service.QuestionService;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepo questionRepo;

    public QuestionServiceImpl(QuestionRepo questionRepo) {
        this.questionRepo = questionRepo;
    }

    @Override
    public QuestionEntity addQuestion(QuestionEntity questionEntity, BindingResult bindingResult) {
        return questionRepo.save(questionEntity);
    }
}
