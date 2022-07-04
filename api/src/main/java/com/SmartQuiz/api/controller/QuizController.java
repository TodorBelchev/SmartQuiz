package com.SmartQuiz.api.controller;

import com.SmartQuiz.api.model.dto.AddQuizDTO;
import com.SmartQuiz.api.model.entity.QuizEntity;
import com.SmartQuiz.api.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuizEntity>> getAll() {
        return ResponseEntity.ok().body(quizService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<QuizEntity> addQuiz(@RequestBody @Valid AddQuizDTO addQuizDTO, BindingResult bindingResult) {
        bindingResult.getAllErrors().forEach(e -> {
            System.out.println(e.getDefaultMessage());
        });
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/quiz/add").toUriString());
        return ResponseEntity.created(uri).body(quizService.addQuiz(addQuizDTO, bindingResult));
    }
}
