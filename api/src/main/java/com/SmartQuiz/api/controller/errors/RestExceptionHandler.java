package com.SmartQuiz.api.controller.errors;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.AccessDeniedException;
import java.util.List;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(HttpServletRequest req, AccessDeniedException ex) {
        return buildResponse(new ErrorResponse(HttpStatus.UNAUTHORIZED, List.of("access_denied")));
    }

    @ExceptionHandler(InvalidRegisterUserRequest.class)
    public ResponseEntity<Object> handleInvalidRegisterUserRequest(HttpServletRequest req, InvalidRegisterUserRequest ex) {
        return buildResponse(new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getErrors()));
    }

    @ExceptionHandler(InvalidAddQuizRequest.class)
    public ResponseEntity<Object> handleInvalidAddQuizRequest(HttpServletRequest req, InvalidAddQuizRequest ex) {
        return buildResponse(new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getErrors()));
    }

    @ExceptionHandler(QuizAlreadyEnrolled.class)
    public ResponseEntity<Object> handleQuizAlreadyEnrolledRequest(HttpServletRequest req, QuizAlreadyEnrolled ex) {
        return buildResponse(new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getErrors()));
    }

    private ResponseEntity<Object> buildResponse(ErrorResponse errorResponse) {
        return new ResponseEntity<Object>(errorResponse, errorResponse.getStatus());
    }
}
