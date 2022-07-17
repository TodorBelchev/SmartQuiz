package com.SmartQuiz.api.controller.errors;

import java.util.Collection;

public class InvalidQuestionRequest extends RuntimeException {

    private Collection<String> errors;

    public InvalidQuestionRequest(Collection<String> errors) {
        this.errors = errors;
    }

    public Collection<String> getErrors() {
        return errors;
    }

    public void setErrors(Collection<String> errors) {
        this.errors = errors;
    }
}
