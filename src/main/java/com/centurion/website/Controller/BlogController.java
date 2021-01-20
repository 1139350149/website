package com.centurion.website.Controller;

import com.centurion.website.Bean.Blog;
import com.centurion.website.Repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Controller
public class BlogController {
    @Autowired
    private BlogRepository blogRepository;

    @RequestMapping("/index")
    String index(Model model) {
        ArrayList<Blog> res = blogRepository.findAll();
        for (int i = 0; i < res.size() && i < 20; i++) {
            if (res.get(i).getBody().length() > 15) {
                res.get(i).setBody(res.get(i).getBody().substring(0, 10) + "...");
            }
        }
        model.addAttribute("blogAll", res);
        return "index.html";
    }

    /*
     * 书写博客
     */
    @RequestMapping("/writeBlog")
    String writeBlog(Model model) {
        model.addAttribute("mod", 1);
        return "writeBlog.html";
    }

    /*
     * 上传博客
     */
    @RequestMapping("/uploadBlog")
    String uploadBlog(@RequestParam String title, @RequestParam String body, HttpSession session) {
        String author = (String) session.getAttribute("loginUser");

        Date date = new Date();
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
        Blog temp = new Blog(author, title, body, timeStamp);

        blogRepository.save(temp);

        return "redirect:/index";
    }
    /*
     * 查看博客
     */
    @RequestMapping("/viewBlog")
    String blog(@RequestParam String blogId, Model model) {
        Blog blog = blogRepository.findBlogByBlogId(Integer.valueOf(blogId));

        model.addAttribute("blog", blog);

        return "blog.html";
    }

    /*
     * 进入用户中心
     */
    @RequestMapping("/userInfo")
    String userInfo(HttpSession session, Model model) {
        String user = (String) session.getAttribute("loginUser");
//        if (null == user) {
//            return "redirect:/login.html";
//        }
        System.out.println(user);

        ArrayList<Blog> res = blogRepository.findBlogsByAuthor(user);
        for (int i = 0; i < res.size() && i < 20; i++) {
            if (res.get(i).getBody().length() > 15) {
                res.get(i).setBody(res.get(i).getBody().substring(0, 10) + "...");
            }
        }
        model.addAttribute("blogsByAuthor", res);
        return "userInfo.html";
    }

    /*
     * 删除博客
     */
    @RequestMapping("/deleteBlog")
    String deleteBlog(@RequestParam String blogId) {
        blogRepository.deleteBlogByBlogId(Integer.valueOf(blogId));
        return "redirect:/userInfo";
    }

    /*
     * 修改博客，跳转至writeBlog.html
     */
    @RequestMapping("/changeBlog")
    String change(@RequestParam String blogId, Model model) {
        Blog blog = blogRepository.findBlogByBlogId(Integer.valueOf(blogId));
        model.addAttribute("changingBlog", blog);
        model.addAttribute("mod", 2);
        return "writeBlog";
    }

    /*
     * 上传已经修改博客，进行数据库更新
     */
    @RequestMapping("/changingBlog")
    String changeBlog(@RequestParam String title, @RequestParam String body, @RequestParam String blogId, HttpSession session) {
        Date date = new Date();
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);

        blogRepository.updateBlogById(title,body,timeStamp,Integer.valueOf(blogId));

        return "index";
    }
}
