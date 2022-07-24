package com.SmartQuiz.api.repo;

import com.SmartQuiz.api.model.entity.QuizResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizResultRepo extends JpaRepository<QuizResultEntity, Long> {
    QuizResultEntity findByUserId(Long id);
}
