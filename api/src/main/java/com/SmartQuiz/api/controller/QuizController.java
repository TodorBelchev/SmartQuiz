package com.SmartQuiz.api.controller;

import com.SmartQuiz.api.model.dto.AddQuizDTO;
import com.SmartQuiz.api.model.dto.EnrollQuizDTO;
import com.SmartQuiz.api.model.dto.QuizViewDTO;
import com.SmartQuiz.api.service.QuizService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;
    private final ModelMapper modelMapper;

    public QuizController(QuizService quizService, ModelMapper modelMapper) {
        this.quizService = quizService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuizViewDTO>> getAll() {
        return ResponseEntity.ok().body(quizService.getAll()
                .stream()
                .map(q -> modelMapper.map(q, QuizViewDTO.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<QuizViewDTO> getById(@PathVariable Long quizId) {
        return ResponseEntity.ok(modelMapper.map(quizService.getById(quizId), QuizViewDTO.class));
    }

    @PostMapping("/add")
    public ResponseEntity<QuizViewDTO> addQuiz(@RequestBody @Valid AddQuizDTO addQuizDTO, BindingResult bindingResult) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/quiz/add").toUriString());
        return ResponseEntity.created(uri).body(modelMapper.map(quizService.addQuiz(addQuizDTO, bindingResult), QuizViewDTO.class));
    }

    @PutMapping("/{quizId}/edit")
    public ResponseEntity<QuizViewDTO> editQuiz(@PathVariable Long quizId,
                                                @RequestBody @Valid AddQuizDTO addQuizDTO, BindingResult bindingResult) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/quiz/" + quizId + "/edit").toUriString());
        return ResponseEntity.created(uri).body(modelMapper.map(quizService.editQuiz(quizId, addQuizDTO, bindingResult), QuizViewDTO.class));
    }

    @PostMapping("/{quizId}/enroll")
    public ResponseEntity<QuizViewDTO> enrollQuiz(@PathVariable Long quizId, @RequestBody @Valid EnrollQuizDTO enrollQuizDTO) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/quiz/" + quizId + "/enroll").toUriString());
        return ResponseEntity.created(uri).body(modelMapper.map(quizService.enroll(quizId, enrollQuizDTO), QuizViewDTO.class));
    }
}
