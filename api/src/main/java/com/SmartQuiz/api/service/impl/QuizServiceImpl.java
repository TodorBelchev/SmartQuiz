package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.controller.errors.InvalidAddQuizRequest;
import com.SmartQuiz.api.controller.errors.ResourceNotFound;
import com.SmartQuiz.api.model.dto.AddQuizDTO;
import com.SmartQuiz.api.model.entity.*;
import com.SmartQuiz.api.model.enums.QuizCategoryEnum;
import com.SmartQuiz.api.repo.QuizRepo;
import com.SmartQuiz.api.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    private final UserService userService;
    private final QuizCategoryService quizCategoryService;
    private final QuizRepo quizRepo;
    private final ModelMapper modelMapper;

    public QuizServiceImpl(UserService userService, QuizCategoryService quizCategoryService, QuizRepo quizRepo, ModelMapper modelMapper) {
        this.userService = userService;
        this.quizCategoryService = quizCategoryService;
        this.quizRepo = quizRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public QuizEntity addQuiz(AddQuizDTO addQuizDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors()
                    .stream()
                    .map(e -> String.format("%s", e.getDefaultMessage())).collect(Collectors.toList());

            throw new InvalidAddQuizRequest(errors);
        }

        QuizEntity quiz = new QuizEntity();
        UserEntity creator = userService.getById(addQuizDTO.getCreator());
        CategoryEntity category = quizCategoryService.findByCategoryNameEnum(modelMapper.map(addQuizDTO.getCategory().toUpperCase(Locale.ROOT), QuizCategoryEnum.class));

        quiz.setCreator(creator);
        quiz.setTitle(addQuizDTO.getTitle());
        quiz.setCategory(category);
        quiz.setDuration(addQuizDTO.getDuration());
        return save(quiz);
    }

    @Override
    public List<QuizEntity> getAll() {
        return quizRepo.findAll();
    }

    @Override
    public QuizEntity getById(Long quizId) {
        return quizRepo.findById(quizId)
                .orElseThrow(() -> new ResourceNotFound(List.of(String.format("Quiz with id %d was not found!", quizId))));
    }

    @Override
    public QuizEntity save(QuizEntity quiz) {
        return quizRepo.save(quiz);
    }
}
