package com.SmartQuiz.api.repo;

import com.SmartQuiz.api.model.entity.QuizEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepo extends JpaRepository<QuizEntity, Long> {
}
