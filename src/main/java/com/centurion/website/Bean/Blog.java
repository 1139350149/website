package com.centurion.website.Bean;

import com.sun.istack.NotNull;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table(name = "blog")
@DynamicUpdate
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int blogId;

    @NotNull
    @Column(name="author", length = 20)
    private String author;

    @NotNull
    @Column(name="title", length = 30)
    private String title;

    @NotNull
    @Column(name="body", length = 12000)
    private String body;

    @Column(name="timeStamp", length=20)
    private String timeStamp;

    public Blog(){}

    public Blog(String author, String title, String body, String timeStamp) {
        this.author = author;
        this.title = title;
        this.body = body;
        this.timeStamp = timeStamp;
    }

    public int getBlogId() {
        return blogId;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setBlogId(int blogId) {
        this.blogId = blogId;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {
        return "Blog{" +
                "blogId=" + blogId +
                ", author='" + author + '\'' +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", timeStamp='" + timeStamp + '\'' +
                '}';
    }
}
