package com.centurion.website.Bean;

import javax.persistence.*;

@Entity
@Table(name="EmailRegisterCode")
public class EmailRegisterCode {
    @Id
    private String registerCode;

    @Column(name="email")
    private String email;

    public EmailRegisterCode() {}

    public EmailRegisterCode(String registerCode, String email) {
        this.registerCode = registerCode;
        this.email = email;
    }

    public String getRegisterCode() {
        return registerCode;
    }

    public String getEmail() {
        return email;
    }

    public void setRegisterCode(String registerCode) {
        this.registerCode = registerCode;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "EmailRegisterCode{" +
                "registerCode='" + registerCode + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
