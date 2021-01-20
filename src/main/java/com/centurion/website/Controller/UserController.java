package com.centurion.website.Controller;

import com.centurion.website.Bean.EmailRegisterCode;
import com.centurion.website.Bean.User;
import com.centurion.website.Repository.EmailRegisterCodeRepository;
import com.centurion.website.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {

    @Autowired
    UserRepository userRepository;     //注入Jpa类

    @Autowired
    EmailRegisterCodeRepository emailRegisterCodeRepository;

    @RequestMapping("/login_data")
    public String login(@RequestParam String username, @RequestParam String password, @RequestParam String validationCode
            , HttpSession session, Model model) {
        if (!validationCode.toLowerCase().equals(session.getAttribute("JCCODE").toString().toLowerCase())) {
            return "login";
        }
        if (username.equals("") || password.equals("")) {
            return "login";
        }
        System.out.println("登录嗷@" + username);
        String message = null;
        if (!userRepository.existsByName(username)) {
            System.out.println("登录个锤子@" + username + "根本没有");
            message = "用户不存在！";
            model.addAttribute("message", message);
            return "login";
        } else {
            User user = userRepository.findUserByName(username);
            System.out.println(user);
            System.out.println(password);
            if (user.getPassword().equals(password)) {
                System.out.println("登录成功@" + username);
                session.setAttribute("loginUser", username);
                System.out.println(session.getAttribute("loginUser"));
                if ("1".equals(user.getCategory())) {
                    return "";
                } else {
                    return "redirect:/";
                }
            } else {
                System.out.println("登录个锤子@" + username + "密码不对啊");
                message = "登录个锤子@" + username + "密码不对啊";
                model.addAttribute("message", message);
                return "login";
            }
        }

    }

    @RequestMapping("/register_data")
    public String register(@RequestParam String username, String email,
                           String password, String sex, String registerCode, Model model) {
        User user;
        if (registerCode == null || registerCode.equals("")) {
            user = new User(username, email, password, sex, "2");
        } else {
            user = new User(username, email, password, sex, "1");
            EmailRegisterCode emailRegisterCode = new EmailRegisterCode(registerCode, email);
            emailRegisterCodeRepository.save(emailRegisterCode);
        }
        System.out.println(user);
        userRepository.save(user);

        String realPath = "src/main/resources/static/uploadImage/" + username;

        File fileDirectory = new File(realPath);

        if (!fileDirectory.isDirectory()){
            System.out.println(fileDirectory.mkdirs());
        }
        
        return "redirect:/login";
    }

    @RequestMapping(value = "registerCodeExistence", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Integer> registerCodeVerification(@RequestParam String registerCode) {
        System.out.println(registerCode);
        HashMap<String, Integer> res = new HashMap<>();
        if (emailRegisterCodeRepository.existsByRegisterCode(registerCode)) {

            EmailRegisterCode emailRegisterCode = emailRegisterCodeRepository.
                    findByRegisterCodeAndEmailIsNotNull(registerCode);
            System.out.println(emailRegisterCode);
            if (emailRegisterCode != null) {
                res.put("flag", -2);
                return res;
            }
            res.put("flag", 0);
            return res;
        }
        res.put("flag", -3);
        return res;
    }

    @RequestMapping(value = "usernameExistence", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Integer> usernameVerification(@RequestParam String username) {
        HashMap<String, Integer> res = new HashMap<>();
        System.out.println("name verifying 。。。");
        if (userRepository.existsByName(username)) {
            res.put("flag", -2);
            return res;
        } else {
            res.put("flag", 0);
            return res;
        }
    }

    @RequestMapping(value = "emailExistence", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Integer> emailVerification(@RequestParam String email) {
        HashMap<String, Integer> res = new HashMap<>();
        System.out.println("email verifying 。。。");
        if (userRepository.existsByEmail(email)) {
            res.put("flag", -4);
            return res;
        } else {
            res.put("flag", 0);
            return res;
        }
    }
}
