package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.controller.errors.ResourceNotFound;
import com.SmartQuiz.api.model.entity.ResponseEntity;
import com.SmartQuiz.api.repo.ResponseRepo;
import com.SmartQuiz.api.service.ResponseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseServiceImpl implements ResponseService {

    private final ResponseRepo responseRepo;

    public ResponseServiceImpl(ResponseRepo responseRepo) {
        this.responseRepo = responseRepo;
    }

    @Override
    public ResponseEntity addResponse(ResponseEntity response) {
        return responseRepo.save(response);
    }

    @Override
    public ResponseEntity getById(Long id) {
        return responseRepo.findById(id).orElseThrow(() -> new ResourceNotFound(List.of(String.format("Response with id %d was not found!", id))));
    }
}
