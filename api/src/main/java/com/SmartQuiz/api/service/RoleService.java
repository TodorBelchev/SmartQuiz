package com.SmartQuiz.api.service;

import com.SmartQuiz.api.model.entity.RoleEntity;

import java.util.List;

public interface RoleService {
    void init();

    List<RoleEntity> getRoles();
}
