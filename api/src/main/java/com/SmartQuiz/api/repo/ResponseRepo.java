package com.SmartQuiz.api.repo;

import com.SmartQuiz.api.model.entity.ResponseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepo extends JpaRepository<ResponseEntity, Long> {
}
