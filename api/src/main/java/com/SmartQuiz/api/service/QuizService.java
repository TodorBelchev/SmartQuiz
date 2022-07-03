package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.dto.AddQuizDTO;
import com.SmartQuiz.api.model.entity.QuizEntity;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface QuizService {
    QuizEntity addQuiz(AddQuizDTO addQuizDTO, BindingResult bindingResult);

    List<QuizEntity> getAll();
}
