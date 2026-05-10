package com.group11.student_management_system.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group11.student_management_system.dto.request.LoginRequest;
import com.group11.student_management_system.dto.request.RefreshTokenRequest;
import com.group11.student_management_system.exception.GlobalExceptionHandler;
import com.group11.student_management_system.security.CustomUserDetailsService;
import com.group11.student_management_system.security.JwtService;
import com.group11.student_management_system.security.UserPrincipal;
import com.group11.student_management_system.entity.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private CustomUserDetailsService userDetailsService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.afterPropertiesSet();

        mockMvc = MockMvcBuilders.standaloneSetup(authController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .setValidator(validator)
                .build();
    }

    private UserPrincipal buildPrincipal(String username, String role) {
        return new UserPrincipal(1L, username, "hashed", role, UserStatus.ACTIVE);
    }

    // ─── Login ──────────────────────────────────────────────────────────────

    @Test
    void login_success_returns200WithTokens() throws Exception {
        UserPrincipal principal = buildPrincipal("admin", "ADMIN");
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

        when(authenticationManager.authenticate(any())).thenReturn(authToken);
        when(jwtService.generateAccessToken(principal)).thenReturn("access.token.here");
        when(jwtService.generateRefreshToken(principal)).thenReturn("refresh.token.here");
        when(jwtService.getAccessTokenExpirationSeconds()).thenReturn(900L);

        LoginRequest request = new LoginRequest();
        request.setIdentifier("admin");
        request.setPassword("secret");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").value("access.token.here"))
                .andExpect(jsonPath("$.data.refreshToken").value("refresh.token.here"))
                .andExpect(jsonPath("$.data.username").value("admin"))
                .andExpect(jsonPath("$.data.role").value("ADMIN"));
    }

    @Test
    void login_wrongPassword_returns401() throws Exception {
        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        LoginRequest request = new LoginRequest();
        request.setIdentifier("admin");
        request.setPassword("wrong");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login_missingIdentifier_returns400() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setPassword("secret");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void login_missingPassword_returns400() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setIdentifier("admin");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    // ─── Refresh ─────────────────────────────────────────────────────────────

    @Test
    void refresh_validToken_returns200WithNewTokens() throws Exception {
        UserPrincipal principal = buildPrincipal("admin", "ADMIN");

        when(jwtService.extractUsername("valid.refresh.token")).thenReturn("admin");
        when(userDetailsService.loadUserByUsername("admin")).thenReturn(principal);
        when(jwtService.isTokenValid("valid.refresh.token", principal, JwtService.TOKEN_TYPE_REFRESH))
                .thenReturn(true);
        when(jwtService.generateAccessToken(principal)).thenReturn("new.access.token");
        when(jwtService.generateRefreshToken(principal)).thenReturn("new.refresh.token");
        when(jwtService.getAccessTokenExpirationSeconds()).thenReturn(900L);

        RefreshTokenRequest request = new RefreshTokenRequest();
        request.setRefreshToken("valid.refresh.token");

        mockMvc.perform(post("/api/v1/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").value("new.access.token"))
                .andExpect(jsonPath("$.data.refreshToken").value("new.refresh.token"));
    }

    @Test
    void refresh_invalidToken_returns401() throws Exception {
        when(jwtService.extractUsername("bad.token")).thenReturn("admin");
        when(userDetailsService.loadUserByUsername("admin")).thenReturn(buildPrincipal("admin", "ADMIN"));
        when(jwtService.isTokenValid(eq("bad.token"), any(), eq(JwtService.TOKEN_TYPE_REFRESH)))
                .thenReturn(false);

        RefreshTokenRequest request = new RefreshTokenRequest();
        request.setRefreshToken("bad.token");

        mockMvc.perform(post("/api/v1/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    // ─── Logout ──────────────────────────────────────────────────────────────

    @Test
    void logout_returns200() throws Exception {
        mockMvc.perform(post("/api/v1/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value("OK"));
    }

    // ─── Login edge cases ────────────────────────────────────────────────────

    @Test
    void login_userNotFound_returns401() throws Exception {
        when(authenticationManager.authenticate(any()))
                .thenThrow(new UsernameNotFoundException("User not found"));

        LoginRequest request = new LoginRequest();
        request.setIdentifier("ghost");
        request.setPassword("secret");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login_inactiveUser_returns401() throws Exception {
        when(authenticationManager.authenticate(any()))
                .thenThrow(new DisabledException("Account disabled"));

        LoginRequest request = new LoginRequest();
        request.setIdentifier("badboy");
        request.setPassword("secret");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login_emptyIdentifier_returns400() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setIdentifier("");
        request.setPassword("secret");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void login_emptyPassword_returns400() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setIdentifier("admin");
        request.setPassword("");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    // ─── Refresh edge cases ──────────────────────────────────────────────────

    @Test
    void refresh_nullUsername_returns401() throws Exception {
        when(jwtService.extractUsername("null.username.token")).thenReturn(null);

        RefreshTokenRequest request = new RefreshTokenRequest();
        request.setRefreshToken("null.username.token");

        mockMvc.perform(post("/api/v1/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void refresh_malformedToken_returns401() throws Exception {
        when(jwtService.extractUsername("malformed"))
                .thenThrow(new BadCredentialsException("Malformed token"));

        RefreshTokenRequest request = new RefreshTokenRequest();
        request.setRefreshToken("malformed");

        mockMvc.perform(post("/api/v1/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }
}
