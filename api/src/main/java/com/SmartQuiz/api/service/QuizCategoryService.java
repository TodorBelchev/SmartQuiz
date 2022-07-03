package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.entity.CategoryEntity;
import com.SmartQuiz.api.model.enums.QuizCategoryEnum;

import java.util.Optional;

public interface QuizCategoryService {
    void init();

    Optional<CategoryEntity> findByCategoryNameEnum(QuizCategoryEnum category);
}
