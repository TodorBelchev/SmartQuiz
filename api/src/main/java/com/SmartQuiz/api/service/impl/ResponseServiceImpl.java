package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.entity.ResponseEntity;
import com.SmartQuiz.api.repo.ResponseRepo;
import com.SmartQuiz.api.service.ResponseService;
import org.springframework.stereotype.Service;

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
}
