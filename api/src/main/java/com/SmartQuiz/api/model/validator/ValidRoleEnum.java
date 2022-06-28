package com.SmartQuiz.api.model.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidRoleEnumValidator.class)
public @interface ValidRoleEnum {
    String message() default "Invalid role.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
