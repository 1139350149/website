package com.centurion.website.Mail;

public interface MailService {
    void sendHTMLMail(String to, String subject, String content);
}
