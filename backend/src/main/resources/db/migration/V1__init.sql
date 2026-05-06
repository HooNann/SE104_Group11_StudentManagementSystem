CREATE TABLE role (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(20) NOT NULL UNIQUE,
  description VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user_account (
  user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at DATETIME,
  updated_at DATETIME,
  INDEX idx_user_account_role_id (role_id),
  CONSTRAINT fk_user_account_role
    FOREIGN KEY (role_id) REFERENCES role(role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE teacher (
  teacher_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  teacher_code VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  department VARCHAR(100),
  user_id BIGINT UNIQUE,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_teacher_user
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `class` (
  class_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  class_name VARCHAR(50) NOT NULL UNIQUE,
  academic_year VARCHAR(9) NOT NULL,
  homeroom_teacher_id BIGINT,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_class_teacher
    FOREIGN KEY (homeroom_teacher_id) REFERENCES teacher(teacher_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE student (
  student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_code VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  date_of_birth DATE NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  address VARCHAR(255),
  class_id BIGINT,
  user_id BIGINT UNIQUE,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_student_class
    FOREIGN KEY (class_id) REFERENCES `class`(class_id),
  CONSTRAINT fk_student_user
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE subject (
  subject_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  subject_code VARCHAR(20) NOT NULL UNIQUE,
  subject_name VARCHAR(100) NOT NULL,
  credits INT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE teaching_assignment (
  assignment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  teacher_id BIGINT NOT NULL,
  subject_id BIGINT NOT NULL,
  class_id BIGINT NOT NULL,
  schedule_time VARCHAR(100),
  room VARCHAR(20),
  semester VARCHAR(20) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_assignment_teacher
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
  CONSTRAINT fk_assignment_subject
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
  CONSTRAINT fk_assignment_class
    FOREIGN KEY (class_id) REFERENCES `class`(class_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE grade (
  grade_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT NOT NULL,
  subject_id BIGINT NOT NULL,
  teacher_id BIGINT NOT NULL,
  assignment_id BIGINT,
  score_process DECIMAL(5,2),
  score_mid DECIMAL(5,2),
  score_final DECIMAL(5,2),
  average_score DECIMAL(5,2),
  semester VARCHAR(20) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_grade_student
    FOREIGN KEY (student_id) REFERENCES student(student_id),
  CONSTRAINT fk_grade_subject
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
  CONSTRAINT fk_grade_teacher
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
  CONSTRAINT fk_grade_assignment
    FOREIGN KEY (assignment_id) REFERENCES teaching_assignment(assignment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE announcement (
  announcement_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_by BIGINT NOT NULL,
  target_role VARCHAR(20) DEFAULT 'ALL',
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_announcement_user
    FOREIGN KEY (created_by) REFERENCES user_account(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
