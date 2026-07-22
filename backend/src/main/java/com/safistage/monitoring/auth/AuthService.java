package com.safistage.monitoring.auth;

import com.safistage.monitoring.auth.dto.ChangePasswordRequest;
import com.safistage.monitoring.auth.dto.LoginRequest;
import com.safistage.monitoring.auth.dto.LoginResponse;
import com.safistage.monitoring.security.JwtService;
import com.safistage.monitoring.user.User;
import com.safistage.monitoring.user.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthService(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        User user = userService.getByUsername(request.username());
        return new LoginResponse(jwtService.generateToken(user.getUsername(), user.getRole().name()), "Bearer", user.getUsername(), user.getRole().name());
    }

    public void changePassword(String username, ChangePasswordRequest request) {
        userService.changePassword(username, request.currentPassword(), request.newPassword());
    }
}
