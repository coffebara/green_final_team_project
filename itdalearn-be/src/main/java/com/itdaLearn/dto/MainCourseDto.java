package com.itdaLearn.dto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MainCourseDto {
	private Long courseNo;
	private String courseTitle;
	private String courseDec1;
	private String imgUrl;
	private Integer coursePrice;
	private String courseTeacher;
	
	@QueryProjection
	public MainCourseDto(Long courseNo, String courseTitle, String courseDec1, String imgUrl, Integer coursePrice, String courseTeacher) {
		this.courseNo = courseNo;
		this.courseTitle = courseTitle;
		this.courseDec1 = courseDec1;
		this.imgUrl = imgUrl;
		this.coursePrice = coursePrice;
		this.courseTeacher = courseTeacher;
	}
	
}
