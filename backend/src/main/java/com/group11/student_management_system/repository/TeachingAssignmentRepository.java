package com.group11.student_management_system.repository;

import com.group11.student_management_system.entity.TeachingAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeachingAssignmentRepository extends JpaRepository<TeachingAssignment, Long> {
}