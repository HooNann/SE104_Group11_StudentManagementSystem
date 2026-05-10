package com.group11.student_management_system.dto.response;

import java.time.LocalDateTime;

public record HealthResponse(String serviceName, String status, LocalDateTime timestamp) {
}