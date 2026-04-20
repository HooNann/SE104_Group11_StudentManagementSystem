package com.group11.student_management_system.repository;

import com.group11.student_management_system.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}