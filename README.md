# SE104_Group11_StudentManagementSystem

Hệ thống quản lý sinh viên

## Công nghệ

- **Frontend**: ReactJS + TailwindCSS
- **Backend**: Spring Boot (Java)
- **Database**: MySQL
- **Kiến trúc**: 3-tier

## Cấu trúc dự án

- `/backend` → Spring Boot
- `/frontend` → ReactJS
- `/docs` → SRS, Use Case, Business Rules...

### Docker (MySQL + phpMyAdmin)

- Start: `docker compose up -d`
- Stop: `docker compose down`
- Reset data: `docker compose down -v`

Thông tin mặc định:

- DB: `student_management_system`
- User: `sms` / `sms123`
- Root: `root` / `root123`
- phpMyAdmin: `http://localhost:8082`

### Backend

- Windows: `mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"`
- Health: `http://localhost:8081/api/v1/system/health`
