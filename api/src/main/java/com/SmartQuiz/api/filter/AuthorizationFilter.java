package com.SmartQuiz.api.filter;

import com.SmartQuiz.api.controller.errors.ErrorResponse;
import com.SmartQuiz.api.controller.errors.InvalidTokenException;
import com.SmartQuiz.api.model.entity.InvalidTokenEntity;
import com.SmartQuiz.api.service.InvalidTokenService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

public class AuthorizationFilter extends OncePerRequestFilter {

    private final InvalidTokenService invalidTokenService;

    public AuthorizationFilter(InvalidTokenService invalidTokenService) {
        this.invalidTokenService = invalidTokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().equals("/user/login") || request.getServletPath().equals("/user/register")) {
            filterChain.doFilter(request, response);
        } else {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                try {
                    String token = authHeader.substring("Bearer ".length());
                    InvalidTokenEntity invalidTokenEntity = invalidTokenService.findByToken(token);

                    if (invalidTokenEntity != null) {
                        throw new RuntimeException(String.format("Token '%s' is invalid!", token));
                    }

                    Algorithm algorithm = Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    Arrays.stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } catch (Exception ex) {
                    response.setHeader("error", ex.getMessage());
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    List<String> messages = new ArrayList<>();
                    messages.add(ex.getMessage());
                    Map<String, List<String>> errorRes = new HashMap<>();
                    errorRes.put("messages", messages);
                    response.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), errorRes);
                }
            }
            filterChain.doFilter(request, response);
        }
    }
}
