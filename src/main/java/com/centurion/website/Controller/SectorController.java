package com.centurion.website.Controller;

import com.centurion.website.Bean.Blog;
import com.centurion.website.Repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;

@Controller
public class SectorController {
    @Autowired
    BlogRepository blogRepository;

    @RequestMapping("/sector")
    String sector(@RequestParam String category, Model model){
        ArrayList<Blog> res = blogRepository.findBlogsBySector(category);
        model.addAttribute("blogAll", res);
        model.addAttribute("category", category);
        return "index.html";
    }
}
