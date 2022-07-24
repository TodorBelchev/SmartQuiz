package com.SmartQuiz.api.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Component
public class JWTUtils {
    public static String createAccessToken(String username, String requestPath, List<String> roles) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .withIssuer(requestPath)
                .withClaim("roles", roles)
                .sign(getAlgorithm());
    }

    public static String createRefreshToken(String username, String requestPath) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .withIssuer(requestPath)
                .sign(getAlgorithm());
    }

    private static Algorithm getAlgorithm() {
        return Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
    }
}
