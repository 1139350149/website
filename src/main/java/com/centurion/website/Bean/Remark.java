package com.centurion.website.Bean;

import com.sun.istack.NotNull;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table(name = "remark")
@DynamicUpdate
public class Remark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int remarkId;

    @NotNull
    @Column(name = "blogId")
    private int blogId;

    @NotNull
    @Column(name = "userName")
    private String userName;

    @NotNull
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "time", length = 20)
    private String time;

    public Remark() {}

    public Remark(int blogId, String userName, String content, String time) {
        this.blogId = blogId;
        this.userName = userName;
        this.content = content;
        this.time = time;
    }

    public int getRemarkId() {
        return remarkId;
    }

    public String getContent() {
        return content;
    }

    public String getTime() {
        return time;
    }

    public int getBlogId() {
        return blogId;
    }

    public String getUserName() {
        return userName;
    }

    public void setRemarkId(int remarkId) {
        this.remarkId = remarkId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setBlogId(int blogId) {
        this.blogId = blogId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "Remark{" +
                "remarkId=" + remarkId +
                ", blogId=" + blogId +
                ", userId=" + userName +
                ", content='" + content + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
