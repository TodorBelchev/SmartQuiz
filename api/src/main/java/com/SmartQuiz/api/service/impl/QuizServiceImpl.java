package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.controller.errors.InvalidAddQuizRequest;
import com.SmartQuiz.api.controller.errors.QuizAlreadyEnrolled;
import com.SmartQuiz.api.controller.errors.ResourceNotFound;
import com.SmartQuiz.api.model.dto.AddQuizDTO;
import com.SmartQuiz.api.model.dto.EnrollQuizDTO;
import com.SmartQuiz.api.model.dto.EnrollResponseDTO;
import com.SmartQuiz.api.model.entity.*;
import com.SmartQuiz.api.model.enums.QuizCategoryEnum;
import com.SmartQuiz.api.repo.QuizRepo;
import com.SmartQuiz.api.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    private final UserService userService;
    private final QuizCategoryService quizCategoryService;
    private final QuizRepo quizRepo;
    private final QuizResultService quizResultService;
    private final QuizService quizService;
    private final ModelMapper modelMapper;

    public QuizServiceImpl(UserService userService, QuizCategoryService quizCategoryService, QuizRepo quizRepo, QuizResultService quizResultService, @Lazy QuizService quizService, ModelMapper modelMapper) {
        this.userService = userService;
        this.quizCategoryService = quizCategoryService;
        this.quizRepo = quizRepo;
        this.quizResultService = quizResultService;
        this.quizService = quizService;
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
    public QuizEntity editQuiz(Long quizId, AddQuizDTO addQuizDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors()
                    .stream()
                    .map(e -> String.format("%s", e.getDefaultMessage())).collect(Collectors.toList());

            throw new InvalidAddQuizRequest(errors);
        }

        QuizEntity quiz = getById(quizId);
        CategoryEntity category = quizCategoryService.findByCategoryNameEnum(modelMapper.map(addQuizDTO.getCategory().toUpperCase(Locale.ROOT), QuizCategoryEnum.class));
        quiz.setTitle(addQuizDTO.getTitle());
        quiz.setCategory(category);
        quiz.setDuration(addQuizDTO.getDuration());
        return save(quiz);
    }

    @Override
    public QuizEntity enroll(Long quizId, EnrollQuizDTO enrollQuizDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        UserEntity userEntity = userService.getByUsername(currentPrincipalName);
        QuizResultEntity quizResultEntity = quizResultService.getByUserId(userEntity.getId());
        QuizEntity quizEntity = quizService.getById(quizId);

        if (quizResultEntity != null) {
            throw new QuizAlreadyEnrolled(List.of("Quiz already enrolled!"));
        }

        int correctResponses = 0;

        for (int i = 0; i < enrollQuizDTO.getResponses().size(); i++) {
            EnrollResponseDTO r = enrollQuizDTO.getResponses().get(i);
            Long questionId = r.getQuestionId();
            Optional<QuestionEntity> questionOption = quizEntity.getQuestions().stream().filter(q -> Objects.equals(q.getId(), questionId)).findFirst();
            if (questionOption.isPresent()) {
                Long correctResponse = questionOption.get().getCorrectResponse();
                if (Objects.equals(correctResponse, r.getResponseId())) {
                    correctResponses++;
                }
            }
        }
        double result = (quizEntity.getQuestions().size() / correctResponses) * 100;

        quizResultEntity = new QuizResultEntity();
        quizResultEntity.setUser(userEntity);
        quizResultEntity.setResult(BigDecimal.valueOf(result));
        quizResultEntity.setQuiz(quizEntity);
        quizResultService.save(quizResultEntity);
        return quizService.getById(quizId);
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
