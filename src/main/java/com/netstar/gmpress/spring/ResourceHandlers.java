package com.netstar.gmpress.spring;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class ResourceHandlers extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String home = "file:/" + System.getProperty("home");
        String locations[] = {home, "classpath:/static/"};
        registry.addResourceHandler("/**").addResourceLocations(locations);
    }
}
