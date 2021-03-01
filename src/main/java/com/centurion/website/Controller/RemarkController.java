package com.centurion.website.Controller;

import com.centurion.website.Bean.Remark;
import com.centurion.website.Repository.RemarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class RemarkController {
    @Autowired
    private RemarkRepository remarkRepository;

    @RequestMapping("/uploadRemark")
    public String uploadRemark(@RequestParam String blogId, @RequestParam String remark, HttpSession httpSession){
        String user = (String)httpSession.getAttribute("loginUser");
        Date date = new Date();
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);

        Remark remarkTemp = new Remark(Integer.valueOf(blogId), user, remark, timeStamp);
        remarkRepository.save(remarkTemp);

        return "redirect:/viewBlog?blogId=" + blogId;
    }
}
