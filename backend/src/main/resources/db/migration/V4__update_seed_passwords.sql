UPDATE user_account
SET password_hash = '$2a$10$MECNH8C4sFvNp2rPs3yRTuwJUYCcrz2B5abulbGYKzoI7RoQEbIlW'
WHERE username IN ('admin', 'teacher01', 'student01');
