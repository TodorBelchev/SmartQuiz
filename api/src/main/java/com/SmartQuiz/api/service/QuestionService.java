package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.entity.QuestionEntity;
import org.springframework.validation.BindingResult;

public interface QuestionService {
    QuestionEntity addQuestion(QuestionEntity questionEntity, BindingResult bindingResult);
}
