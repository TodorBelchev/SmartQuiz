package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.controller.errors.InvalidAddQuizRequest;
import com.SmartQuiz.api.model.dto.AddQuizDTO;
import com.SmartQuiz.api.model.entity.*;
import com.SmartQuiz.api.model.enums.QuizCategoryEnum;
import com.SmartQuiz.api.repo.QuizRepo;
import com.SmartQuiz.api.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    private final UserService userService;
    private final ResponseService responseService;
    private final QuestionService questionService;
    private final QuizCategoryService quizCategoryService;
    private final QuizRepo quizRepo;
    private final ModelMapper modelMapper;

    public QuizServiceImpl(UserService userService, ResponseService responseService, QuestionService questionService, QuizCategoryService quizCategoryService, QuizRepo quizRepo, ModelMapper modelMapper) {
        this.userService = userService;
        this.responseService = responseService;
        this.questionService = questionService;
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
        List<QuestionEntity> questions = new ArrayList<>();
        CategoryEntity category = quizCategoryService.findByCategoryNameEnum(modelMapper.map(addQuizDTO.getCategory(), QuizCategoryEnum.class));


        addQuizDTO.getQuestions().forEach(questionDTO -> {
            QuestionEntity question = new QuestionEntity();
            List<ResponseEntity> responses = new ArrayList<>();

            questionDTO.getResponses().forEach(r -> {
                ResponseEntity response = responseService.addResponse(modelMapper.map(r, ResponseEntity.class));
                responses.add(response);

                if (questionDTO.getCorrectResponse().equals(response.getText())) {
                    question.setCorrectResponse(response.getId());
                }
            });

            question.setResponses(responses);
            question.setText(questionDTO.getText());
            QuestionEntity savedQuestion = questionService.addQuestion(modelMapper.map(question, QuestionEntity.class), bindingResult);
            questions.add(savedQuestion);
        });

        quiz.setCreator(creator);
        quiz.setTitle(addQuizDTO.getTitle());
        quiz.setQuestions(questions);
        quiz.setCategory(category);
        return quizRepo.save(quiz);
    }

    @Override
    public List<QuizEntity> getAll() {
        return quizRepo.findAll();
    }
}
