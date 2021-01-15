package com.centurion.website.controller;

import java.util.*;

import com.centurion.website.util.ValidateCodeImage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.*;

@Controller
public class ValidateCodeController {

    @RequestMapping(value = "/getValidateCode", method = RequestMethod.GET)
    @ResponseBody
    public void getCaptchaImg(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

        try {
            response.setContentType("image/png");
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Expire", "0");
            response.setHeader("Pragma", "no-cache");
            ValidateCodeImage validateCode = new ValidateCodeImage();
            // getRandomCodeImage方法会直接将生成的验证码图片写入response
            validateCode.getRandomCodeBase64(request, response);
            // System.out.println("session里面存储的验证码为："+session.getAttribute("JCCODE"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @RequestMapping(value = "/getValidateCode64", method = RequestMethod.GET)
    @ResponseBody
    public Object getCaptchaBase64(HttpServletRequest request, HttpServletResponse response) {

        Map result = new HashMap();
        try {

            response.setContentType("image/png");
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Expire", "0");
            response.setHeader("Pragma", "no-cache");
            ValidateCodeImage validateCode = new ValidateCodeImage();
            // 返回base64
            String base64String = validateCode.getRandomCodeBase64(request, response);
            result.put("url", "data:image/png;base64," + base64String);
//            result.put("message", "created successfull");
            //http://tool.chinaz.com/tools/imgtobase/  base64直接转为图片网站
//            System.out.println("结果：" + result.get("url"));

        } catch (Exception e) {
            System.out.println(e);
        }

        return result;
    }

    @RequestMapping(value = "getJCCODE", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, String> usernameVerification(HttpSession session) {
        HashMap<String, String> res = new HashMap<>();
        System.out.println("JCCODE getting 。。。");
        res.put("jcode", session.getAttribute("JCCODE").toString().toLowerCase());
        return res;
    }

}
