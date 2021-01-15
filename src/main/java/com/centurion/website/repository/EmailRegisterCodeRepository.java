package com.centurion.website.repository;

import com.centurion.website.Bean.EmailRegisterCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface EmailRegisterCodeRepository extends JpaRepository<EmailRegisterCode, Long> {
    EmailRegisterCode findByRegisterCodeAndEmailIsNotNull(String registerCode);
    boolean existsByRegisterCode(String registerCode);
}
