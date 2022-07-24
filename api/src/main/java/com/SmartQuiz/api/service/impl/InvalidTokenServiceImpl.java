package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.entity.InvalidTokenEntity;
import com.SmartQuiz.api.repo.InvalidTokenRepo;
import com.SmartQuiz.api.service.InvalidTokenService;
import org.springframework.stereotype.Service;

@Service
public class InvalidTokenServiceImpl implements InvalidTokenService {

    private final InvalidTokenRepo invalidTokenRepo;

    public InvalidTokenServiceImpl(InvalidTokenRepo invalidTokenRepo) {
        this.invalidTokenRepo = invalidTokenRepo;
    }

    @Override
    public void addToken(String token) {
        InvalidTokenEntity invalidTokenEntity = new InvalidTokenEntity();
        invalidTokenEntity.setToken(token);
        invalidTokenRepo.save(invalidTokenEntity);
    }

    @Override
    public InvalidTokenEntity findByToken(String token) {
        return invalidTokenRepo.findByToken(token);
    }
}
