package com.group11.student_management_system.repository;

import com.group11.student_management_system.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
	Optional<UserAccount> findByUsernameIgnoreCaseOrEmailIgnoreCase(String username, String email);
}