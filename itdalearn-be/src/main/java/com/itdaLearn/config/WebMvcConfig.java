package com.itdaLearn.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class WebMvcConfig implements WebMvcConfigurer{
	
	@Override 
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:3000")
				.allowedMethods("GET","POST","DELETE","PUT","PATCH")
				.allowCredentials(true);
	}
	
	@Value("${uploadPath}")
	String uploadPath;
//addResourceHandlers 메서드를 통해서 자신의 로컬 컴퓨터에 업로드한 파일을 찾을 위치를 설정
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/images/**")
				.addResourceLocations(uploadPath);
	}//로컬 컴퓨터에 저장된 파일을 읽어올 root 경로를 설정합니다.
}