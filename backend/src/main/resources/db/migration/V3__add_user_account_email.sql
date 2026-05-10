ALTER TABLE user_account
  ADD COLUMN email VARCHAR(100) UNIQUE AFTER username;

UPDATE user_account
SET email = CASE username
  WHEN 'admin' THEN 'admin@example.com'
  WHEN 'teacher01' THEN 'teacher01@example.com'
  WHEN 'student01' THEN 'student01@example.com'
  ELSE CONCAT(username, '@example.com')
END
WHERE email IS NULL;
