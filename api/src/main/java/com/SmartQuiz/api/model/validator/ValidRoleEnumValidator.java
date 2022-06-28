package com.SmartQuiz.api.model.validator;

import com.SmartQuiz.api.model.enums.RoleEnum;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class ValidRoleEnumValidator implements ConstraintValidator<ValidRoleEnum, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return Arrays.asList(RoleEnum.values()).contains(value);
    }
}
