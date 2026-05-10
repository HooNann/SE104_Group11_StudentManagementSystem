package com.group11.student_management_system.repository;

import com.group11.student_management_system.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}