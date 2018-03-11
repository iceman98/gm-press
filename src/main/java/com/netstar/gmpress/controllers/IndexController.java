package com.netstar.gmpress.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/")
public class IndexController {

    @RequestMapping("/")
    public void getIndex(HttpServletResponse response) throws IOException {
        response.sendRedirect("/index.html");
    }
}
