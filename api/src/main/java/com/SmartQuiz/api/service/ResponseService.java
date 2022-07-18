package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.entity.ResponseEntity;

public interface ResponseService {
    ResponseEntity addResponse(ResponseEntity response);

    ResponseEntity getById(Long id);
}
