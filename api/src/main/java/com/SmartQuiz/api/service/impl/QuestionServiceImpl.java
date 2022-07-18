package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.controller.errors.InvalidQuestionRequest;
import com.SmartQuiz.api.controller.errors.ResourceNotFound;
import com.SmartQuiz.api.model.dto.AddQuestionDTO;
import com.SmartQuiz.api.model.dto.ResponseDTO;
import com.SmartQuiz.api.model.entity.QuestionEntity;
import com.SmartQuiz.api.model.entity.QuizEntity;
import com.SmartQuiz.api.model.entity.ResponseEntity;
import com.SmartQuiz.api.repo.QuestionRepo;
import com.SmartQuiz.api.service.QuestionService;
import com.SmartQuiz.api.service.QuizService;
import com.SmartQuiz.api.service.ResponseService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepo questionRepo;
    private final ModelMapper modelMapper;
    private final QuizService quizService;
    private final ResponseService responseService;

    public QuestionServiceImpl(QuestionRepo questionRepo, ModelMapper modelMapper, QuizService quizService, ResponseService responseService) {
        this.questionRepo = questionRepo;
        this.modelMapper = modelMapper;
        this.quizService = quizService;
        this.responseService = responseService;
    }

    @Override
    @Transactional
    public QuizEntity addQuestion(AddQuestionDTO addQuestionDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> String.format("%s", e.getDefaultMessage())).collect(Collectors.toList());

            throw new InvalidQuestionRequest(errors);
        }

        QuestionEntity question = new QuestionEntity();
        List<ResponseEntity> responses = new ArrayList<>();

        addQuestionDTO.getQuestion().getResponses().forEach(r -> {
            ResponseEntity response = responseService.addResponse(modelMapper.map(r, ResponseEntity.class));
            responses.add(response);

            if (addQuestionDTO.getQuestion().getCorrectResponse().equals(response.getText())) {
                question.setCorrectResponse(response.getId());
            }
        });

        question.setResponses(responses);
        question.setText(addQuestionDTO.getQuestion().getText());

        QuestionEntity saved = questionRepo.save(question);
        QuizEntity quiz = quizService.getById(addQuestionDTO.getQuizId());
        quiz.getQuestions().add(saved);
        return quizService.save(quiz);
    }

    @Override
    @Transactional
    public QuizEntity editQuestion(Long questionId, AddQuestionDTO addQuestionDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> String.format("%s", e.getDefaultMessage())).collect(Collectors.toList());

            throw new InvalidQuestionRequest(errors);
        }

        QuestionEntity question = getById(questionId);
        List<ResponseEntity> responses = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            ResponseEntity response = responseService.getById(((ResponseEntity) question.getResponses().toArray()[i]).getId());
            ResponseDTO incRes = (ResponseDTO) addQuestionDTO.getQuestion().getResponses().toArray()[i];
            response.setText(incRes.getText());
            ResponseEntity savedResponse = responseService.addResponse(response);
            responses.add(savedResponse);

            if (addQuestionDTO.getQuestion().getCorrectResponse().equals(response.getText())) {
                question.setCorrectResponse(response.getId());
            }
        }

        question.setResponses(responses);
        question.setText(addQuestionDTO.getQuestion().getText());

        questionRepo.save(question);
        QuizEntity quiz = quizService.getById(addQuestionDTO.getQuizId());
        return quizService.save(quiz);
    }

    @Override
    public QuestionEntity getById(Long questionId) {
        return questionRepo.findById(questionId).orElseThrow(() -> new ResourceNotFound(List.of(String.format("Question with id %d was not found!", questionId))));
    }

    @Override
    public QuizEntity deleteById(Long questionId, Long quizId) {
        QuizEntity quiz = quizService.getById(quizId);
        Collection<QuestionEntity> questions = quiz.getQuestions();
        List<QuestionEntity> newQuestions = questions.stream().filter(q -> q.getId() != questionId).collect(Collectors.toList());
        quiz.setQuestions(newQuestions);
        QuizEntity save = quizService.save(quiz);
        questionRepo.deleteById(questionId);
        return save;
    }


}
