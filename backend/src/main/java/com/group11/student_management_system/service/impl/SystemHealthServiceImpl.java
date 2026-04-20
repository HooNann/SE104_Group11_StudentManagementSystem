package com.group11.student_management_system.service.impl;

import com.group11.student_management_system.dto.response.HealthResponse;
import com.group11.student_management_system.service.SystemHealthService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SystemHealthServiceImpl implements SystemHealthService {

    @Override
    public HealthResponse getHealth() {
        return new HealthResponse("student-management-system", "UP", LocalDateTime.now());
    }
}