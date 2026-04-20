package com.group11.student_management_system.repository;

import com.group11.student_management_system.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}