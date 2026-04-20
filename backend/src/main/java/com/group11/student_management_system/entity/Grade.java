package com.group11.student_management_system.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "grade")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Long gradeId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private TeachingAssignment teachingAssignment;

    @Column(name = "score_process", precision = 5, scale = 2)
    private BigDecimal scoreProcess;

    @Column(name = "score_mid", precision = 5, scale = 2)
    private BigDecimal scoreMid;

    @Column(name = "score_final", precision = 5, scale = 2)
    private BigDecimal scoreFinal;

    @Column(name = "average_score", precision = 5, scale = 2, insertable = false, updatable = false)
    private BigDecimal averageScore;

    @Column(name = "semester", nullable = false, length = 20)
    private String semester;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}