package com.SmartQuiz.api.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.http.HttpHeaders;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class AuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().equals("/users/login")) {
            filterChain.doFilter(request, response);
        } else {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
               try {
                   String token = authHeader.substring("Bearer ".length());
                   Algorithm algorithm = Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
                   JWTVerifier verifier = JWT.require(algorithm).build();
                   DecodedJWT decodedJWT = verifier.verify(token);
                   String username = decodedJWT.getSubject();
                   String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                   Collection<SimpleGrantedAuthority> authorities  = new ArrayList<>();
                   Arrays.stream(roles).forEach(role-> {
                       authorities.add(new SimpleGrantedAuthority(role));
                   });
                   UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
                   SecurityContextHolder.getContext().setAuthentication(authToken);

               } catch (Exception ex) {
                    response.setHeader("error", ex.getMessage());
                    response.sendError(HttpServletResponse.SC_FORBIDDEN);
               }
            }
            filterChain.doFilter(request, response);
        }
    }
}
