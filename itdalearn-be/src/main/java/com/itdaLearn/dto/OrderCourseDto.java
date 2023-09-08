package com.itdaLearn.dto;

import com.itdaLearn.entity.OrderCourse;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderCourseDto {
	
	public OrderCourseDto(OrderCourse orderCourse, String imgUrl) {
		
		this.courseTitle = orderCourse.getCourse().getCourseTitle();
		this.coursePrice = orderCourse.getCourse().getCoursePrice();
		this.imgUrl = imgUrl;
	}
	
	private String courseTitle; //강의명	
	private int coursePrice; //강의 가격 
	private String imgUrl; //강의 이미지.
		
}
