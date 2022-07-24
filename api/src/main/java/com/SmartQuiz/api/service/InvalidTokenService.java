package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.entity.InvalidTokenEntity;

public interface InvalidTokenService {
    void addToken(String token);

    InvalidTokenEntity findByToken(String token);
}
