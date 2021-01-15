package com.centurion.website.Bean;

import com.sun.istack.NotNull;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table(name = "user")
@DynamicUpdate
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(name="username", length = 20, unique = true)
    private String name;

    @NotNull
    @Column(name="email", length = 30, unique = true)
    private String email;

    @NotNull
    @Column(name="password", length = 30)
    private String password;

    @Column(name="sex", length=20)
    private String sex;

    @Column(name="category", length=3)
    private String category;


    public User() { }

    public User(String name, String email, String password, String sex, String category) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.sex = sex;
        this.category = category;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getSex() {
        return sex;
    }

    public String getCategory() {
        return category;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", sex='" + sex + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
