package com.SmartQuiz.api.controller;

import com.SmartQuiz.api.model.dto.AddQuestionDTO;
import com.SmartQuiz.api.model.dto.QuestionViewDTO;
import com.SmartQuiz.api.model.dto.QuizViewDTO;
import com.SmartQuiz.api.model.entity.QuizEntity;
import com.SmartQuiz.api.service.QuestionService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;
    private final ModelMapper modelMapper;

    public QuestionController(QuestionService questionService, ModelMapper modelMapper) {
        this.questionService = questionService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/add")
    public ResponseEntity<QuizViewDTO> addQuestion(@RequestBody @Valid AddQuestionDTO addQuestionDTO, BindingResult bindingResult) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/question/add").toUriString());
        return ResponseEntity.created(uri).body(modelMapper.map(questionService.addQuestion(addQuestionDTO, bindingResult), QuizViewDTO.class));
    }

    @DeleteMapping("/{questionId}/{quizId}")
    public ResponseEntity<QuizViewDTO> deleteQuestion(@PathVariable Long questionId, @PathVariable Long quizId) {
        QuizEntity quizEntity = questionService.deleteById(questionId, quizId);
        return ResponseEntity.ok().body(modelMapper.map(quizEntity, QuizViewDTO.class));
    }
}
