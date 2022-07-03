package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.entity.CategoryEntity;
import com.SmartQuiz.api.model.enums.QuizCategoryEnum;
import com.SmartQuiz.api.repo.QuizCategoryRepo;
import com.SmartQuiz.api.service.QuizCategoryService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class QuizCategoryServiceImpl implements QuizCategoryService {

    private final QuizCategoryRepo quizCategoryRepo;

    public QuizCategoryServiceImpl(QuizCategoryRepo quizCategoryRepo) {
        this.quizCategoryRepo = quizCategoryRepo;
    }

    @Override
    public void init() {
        if (quizCategoryRepo.count() != 0) {
            return;
        }

        Arrays.stream(QuizCategoryEnum.values())
                .forEach(categoryNameEnum -> {
                    CategoryEntity category = new CategoryEntity(categoryNameEnum);
                    quizCategoryRepo.save(category);
                });
    }

    @Override
    public Optional<CategoryEntity> findByCategoryNameEnum(QuizCategoryEnum category) {
        return quizCategoryRepo.findByName(category);
    }
}
