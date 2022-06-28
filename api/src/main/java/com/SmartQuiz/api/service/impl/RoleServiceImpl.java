package com.SmartQuiz.api.service.impl;

import com.SmartQuiz.api.model.entity.RoleEntity;
import com.SmartQuiz.api.model.enums.RoleEnum;
import com.SmartQuiz.api.repo.RoleRepo;
import com.SmartQuiz.api.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepo roleRepo;

    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public void init() {
        if (roleRepo.count() != 0) {
            return;
        }

        Arrays.stream(RoleEnum.values())
                .forEach(roleEnum -> {
                    RoleEntity role = new RoleEntity();
                    role.setName(roleEnum);

                    roleRepo.save(role);
                });
    }

    @Override
    public List<RoleEntity> getRoles() {
        return roleRepo.findAll();
    }
}
