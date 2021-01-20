package com.centurion.website.Repository;

import com.centurion.website.Bean.EmailRegisterCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRegisterCodeRepository extends JpaRepository<EmailRegisterCode, Long> {
    EmailRegisterCode findByRegisterCodeAndEmailIsNotNull(String registerCode);
    boolean existsByRegisterCode(String registerCode);
}
