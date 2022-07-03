package com.SmartQuiz.api.controller;

import com.SmartQuiz.api.model.entity.QuizEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    @PostMapping("/add")
    public ResponseEntity<QuizEntity> addQuiz() {
        return ResponseEntity.ok().build();
    }
}
