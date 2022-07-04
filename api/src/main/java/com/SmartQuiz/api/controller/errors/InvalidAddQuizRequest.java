package com.SmartQuiz.api.controller.errors;

import java.util.Collection;

public class InvalidAddQuizRequest extends RuntimeException {
    private Collection<String> errors;

    public InvalidAddQuizRequest(Collection<String> errors) {
        this.errors = errors;
    }

    public Collection<String> getErrors() {
        return errors;
    }

    public void setErrors(Collection<String> errors) {
        this.errors = errors;
    }
}
