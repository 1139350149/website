package com.centurion.website.Mail;

import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service("MailService")
public class MailServiceImp implements MailService {
    @Autowired
    private JavaMailSender MailSender;

    @Value("qiaoxixi7518@163.com")
    private String from;

    /**
     * 发送HTML格式的邮件
     * @param to 接收人
     * @param subject 主题
     * @param content 内容
     */
    @Override
    public void sendHTMLMail(String to, String subject, String content) {
        SimpleMailMessage mailMessage=new SimpleMailMessage();
        mailMessage.setFrom(from);
        mailMessage.setText(content);
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setCc("qiaoxixi7518@163.com");
        MailSender.send(mailMessage);
    }
}
