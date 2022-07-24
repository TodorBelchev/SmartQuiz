package com.SmartQuiz.api.repo;

import com.SmartQuiz.api.model.entity.RoleEntity;
import com.SmartQuiz.api.model.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<RoleEntity, Long> {

    RoleEntity findByName(String name);

    RoleEntity findByName(RoleEnum name);
}
