package com.centurion.website.controller;

import com.centurion.website.Bean.Blog;
import com.centurion.website.repository.BlogRepository;
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

    @RequestMapping("/uploadBlog")
    String uploadBlog(@RequestParam String title, @RequestParam String body, HttpSession session) {
        String author = (String) session.getAttribute("loginUser");

//        if (null == author) {
//            return "/login";
//        }

        Date date = new Date();

        if (title.length() > 30) {
            title = title.substring(0, 30);
        } else if (title.length() == 0 || body.length() == 0) {
            return "redirect:/writeBlog";
        }
        if (body.length() > 2000) {
            body = body.substring(0, 2000);
        }
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
        Blog temp = new Blog(author, title, body, timeStamp);

        blogRepository.save(temp);

        return "redirect:/index";
    }

    @RequestMapping("/viewBlog")
    String blog(@RequestParam String blogId, Model model) {
        Blog blog = blogRepository.findBlogByBlogId(Integer.valueOf(blogId));

        String[] res = blog.getBody().split("\n");

//        System.out.println(blog);

        model.addAttribute("author", blog.getAuthor());
        model.addAttribute("title", blog.getTitle());
        model.addAttribute("timeStamp", blog.getTimeStamp());
        model.addAttribute("len", blog.getBody().length());
        model.addAttribute("paragraph", res);
        return "blog.html";
    }

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

    @RequestMapping("/deleteBlog")
    String deleteBlog(@RequestParam String blogId) {
//        System.out.println(blogId);
        blogRepository.deleteBlogByBlogId(Integer.valueOf(blogId));
        return "redirect:/userInfo";
    }

    @RequestMapping("/changeBlog")
    String change(@RequestParam String blogId, Model model) {
        Blog blog = blogRepository.findBlogByBlogId(Integer.valueOf(blogId));
        model.addAttribute("changingBlog", blog);
        model.addAttribute("mod", 2);
//        System.out.println(blog);
        return "writeBlog";
    }

    @RequestMapping("/changingBlog")
    String changeBlog(@RequestParam String title, @RequestParam String body, @RequestParam String blogId, HttpSession session) {
        Date date = new Date();

        if (title.length() > 30) {
            title = title.substring(0, 30);
        } else if (title.length() == 0 || body.length() == 0) {
            return "redirect:/writeBlog";
        }
        if (body.length() > 2000) {
            body = body.substring(0, 2000);
        }
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);

        blogRepository.updateBlogById(title,body,timeStamp,Integer.valueOf(blogId));

        return "index";
    }
}
