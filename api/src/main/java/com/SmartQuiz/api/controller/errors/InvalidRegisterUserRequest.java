package com.SmartQuiz.api.controller.errors;

import java.util.Collection;

public class InvalidRegisterUserRequest extends RuntimeException {

    private Collection<String> errors;

    public InvalidRegisterUserRequest(Collection<String> errors) {
        this.errors = errors;
    }

    public Collection<String> getErrors() {
        return errors;
    }

    public void setErrors(Collection<String> errors) {
        this.errors = errors;
    }
}
