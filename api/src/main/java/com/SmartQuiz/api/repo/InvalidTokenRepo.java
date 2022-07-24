package com.SmartQuiz.api.repo;

import com.SmartQuiz.api.model.entity.InvalidTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvalidTokenRepo extends JpaRepository<InvalidTokenEntity, Long> {
    InvalidTokenEntity findByToken(String token);
}
