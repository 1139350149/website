package com.centurion.website.Repository;

import com.centurion.website.Bean.Remark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface RemarkRepository extends JpaRepository<Remark, Long> {
    ArrayList<Remark> findRemarksByBlogId(int blogId);
}
