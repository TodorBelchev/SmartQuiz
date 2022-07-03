package com.SmartQuiz.api.init;

import com.SmartQuiz.api.service.QuizCategoryService;
import com.SmartQuiz.api.service.RoleService;
import com.SmartQuiz.api.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInit implements CommandLineRunner {

    private final RoleService roleService;
    private final UserService userService;
    private final QuizCategoryService quizCategoryService;

    public DatabaseInit(RoleService roleService, UserService userService, QuizCategoryService quizCategoryService) {
        this.roleService = roleService;
        this.userService = userService;
        this.quizCategoryService = quizCategoryService;
    }

    @Override
    public void run(String... args) throws Exception {
        roleService.init();
        userService.init();
        quizCategoryService.init();
    }
}
