package com.SmartQuiz.api.repo;

import com.SmartQuiz.api.model.entity.CategoryEntity;
import com.SmartQuiz.api.model.enums.QuizCategoryEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizCategoryRepo extends JpaRepository<CategoryEntity, Long> {
    Optional<CategoryEntity> findByName(QuizCategoryEnum categoryNameEnum);
}
