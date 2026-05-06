-- Dev-only seed data

INSERT INTO role (role_name, description)
VALUES
  ('ADMIN', 'System administrator'),
  ('TEACHER', 'Teacher'),
  ('STUDENT', 'Student');

INSERT INTO user_account (username, password_hash, role_id, status, created_at, updated_at)
VALUES
  ('admin', 'dev', (SELECT role_id FROM role WHERE role_name = 'ADMIN'), 'ACTIVE', NOW(), NOW()),
  ('teacher01', 'dev', (SELECT role_id FROM role WHERE role_name = 'TEACHER'), 'ACTIVE', NOW(), NOW()),
  ('student01', 'dev', (SELECT role_id FROM role WHERE role_name = 'STUDENT'), 'ACTIVE', NOW(), NOW());

INSERT INTO teacher (teacher_code, full_name, email, phone, department, user_id, created_at, updated_at)
VALUES
  ('TCH001', 'Teacher One', 'teacher01@example.com', '0900000000', 'Computer Science',
   (SELECT user_id FROM user_account WHERE username = 'teacher01'), NOW(), NOW());

INSERT INTO `class` (class_name, academic_year, homeroom_teacher_id, created_at, updated_at)
VALUES
  ('SE104-01', '2025-2026',
   (SELECT teacher_id FROM teacher WHERE teacher_code = 'TCH001'), NOW(), NOW());

INSERT INTO student (student_code, full_name, gender, date_of_birth, email, phone, address, class_id, user_id, created_at, updated_at)
VALUES
  ('STU001', 'Student One', 'Male', '2005-01-01', 'student01@example.com', '0900000001', 'HCMC',
   (SELECT class_id FROM `class` WHERE class_name = 'SE104-01'),
   (SELECT user_id FROM user_account WHERE username = 'student01'), NOW(), NOW());
