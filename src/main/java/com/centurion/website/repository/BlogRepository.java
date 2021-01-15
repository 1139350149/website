package com.centurion.website.repository;

import com.centurion.website.Bean.Blog;
import org.springframework.data.jpa.repository.*;

import javax.transaction.Transactional;
import java.util.ArrayList;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    ArrayList<Blog> findAll();
    Blog findBlogByBlogId(int id);
    ArrayList<Blog> findBlogsByAuthor(String author);

    @Transactional
    @Modifying
    void deleteBlogByBlogId(int id);

    @Query(value = "update blog set title=?1, body=?2, time_stamp = ?3 where blog_id = ?4  ", nativeQuery = true)
    @Transactional
    @Modifying
    void updateBlogById(String title, String body, String timeStamp ,int blogId);
}
