package com.centurion.website.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class SurfaceController {
    @RequestMapping("/")
    String homePage() {
        return "backHome.html";
    }

    @RequestMapping("/login")
    String login() {
        return "login.html";
    }

    @RequestMapping("/register")
    String register() {
        return "register.html";
    }

    @RequestMapping("/exit")
    String exit(HttpSession session) {
        session.removeAttribute("loginUser");
        System.out.println(session.getAttribute("loginUser"));
        return "redirect:/";
    }

//    @RequestMapping("/backHome")
//    String backHome() {
//        return "home.html";
//    }

    @RequestMapping("/test")
    String backHome() {
        return "backHeader.html";
    }

}
