package com.centurion.website.Config;

import javax.servlet.*;
import javax.servlet.Filter;
import javax.servlet.http.*;

import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "sessionFilter",urlPatterns = {"/*"})
public class SessionFilter implements Filter {
    //不需要登录就可以访问的路径(比如:注册登录等)
    private String[] includeUrls = new String[]{"/login","/","/register","/index",
            "/getValidateCode64", "/getJCCODE", "/login_data", "/exit", "/test",
            "/sendMail", "/emailExistence", "/usernameExistence",
            "/registerCodeExistence", "/register_data"};

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        HttpSession session = request.getSession(false);
        String url = request.getRequestURI();
//        System.out.println("filter-url:"+url);
        boolean needFilter = isNeedFilter(url);
        if(!needFilter){
            filterChain.doFilter(servletRequest, servletResponse);
        }else {
            // 验证登录状态
//            System.out.println(session);
            if (session == null){
                response.sendRedirect("/login");
                return ;
            }
            if(null != session.getAttribute("loginUser")){
                filterChain.doFilter(servletRequest, servletResponse);
            }else{
                response.sendRedirect("/login");
            }
        }

    }

    public boolean isNeedFilter(String uri) {
        for (String includeUrl : includeUrls) {
            if(includeUrl.equals(uri)) {
                return false;
            }
            if(uri.contains(".css")||uri.contains(".js")||uri.contains(".jpg")||uri.contains(".png")||uri.contains(".gif")){
                return false;
            }
        }
        return true;
    }


    @Override
    public void destroy() {

    }
}
