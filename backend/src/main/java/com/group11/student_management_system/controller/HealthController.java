package com.group11.student_management_system.controller;

import com.group11.student_management_system.common.ApiResponse;
import com.group11.student_management_system.dto.response.HealthResponse;
import com.group11.student_management_system.service.SystemHealthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/system")
public class HealthController {

    private final SystemHealthService systemHealthService;

    public HealthController(SystemHealthService systemHealthService) {
        this.systemHealthService = systemHealthService;
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<HealthResponse>> getHealth() {
        HealthResponse healthResponse = systemHealthService.getHealth();
        return ResponseEntity.ok(ApiResponse.success("Service is healthy", healthResponse));
    }
}