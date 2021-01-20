package com.centurion.website.Repository;

import com.centurion.website.Bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByName(String name);
    boolean existsByName(String name);
    boolean existsByEmail(String email);
}
