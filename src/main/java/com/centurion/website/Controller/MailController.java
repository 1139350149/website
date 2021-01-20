package com.centurion.website.Controller;

import com.centurion.website.Mail.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MailController {

    @Autowired
    private MailService mailService;

    @RequestMapping("sendMail")
    @ResponseBody
    public Map<String, Object> getMailService(String email_add) {
        System.out.println("Sending Mail");
        Map<String, Object> resultMap = new HashMap<>();
        String code = VerificationCodeInit.getVerificationCode(6);
        System.out.println("Code is ".concat(code));
        mailService.sendHTMLMail(email_add, "验证码服务", "尊敬的用户,您好:\n"
                + "本次请求的邮件验证码为:" + code + ",请及时输入。（请勿泄露此验证码）\n"
                + "\n如非本人操作，请忽略该邮件。\n(这是一封自动发送的邮件，请不要直接回复）");
        resultMap.put("result", "验证码已发送至" + email_add);
        resultMap.put("key", code.toLowerCase());    //key是验证码的键
        return resultMap;
    }
}
