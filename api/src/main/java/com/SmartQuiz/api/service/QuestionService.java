package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.dto.AddQuestionDTO;
import com.SmartQuiz.api.model.entity.QuestionEntity;
import com.SmartQuiz.api.model.entity.QuizEntity;
import org.springframework.validation.BindingResult;

public interface QuestionService {
    QuizEntity addQuestion(AddQuestionDTO addQuestionDTO, BindingResult bindingResult);

    QuizEntity deleteById(Long questionId, Long quizId);

    QuizEntity editQuestion(Long questionId, AddQuestionDTO addQuestionDTO, BindingResult bindingResult);

    QuestionEntity getById(Long questionId);
}
