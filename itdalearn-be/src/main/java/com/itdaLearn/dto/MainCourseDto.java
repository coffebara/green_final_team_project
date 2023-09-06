package com.itdaLearn.dto;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
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
	private CourseLevel courseLevel;
	private CourseCategory courseCategory;
	
	@QueryProjection
	public MainCourseDto(Long courseNo, String courseTitle, String courseDec1, String imgUrl, Integer coursePrice, String courseTeacher, CourseCategory courseCategory, CourseLevel courseLevel) {
		this.courseNo = courseNo;
		this.courseTitle = courseTitle;
		this.courseDec1 = courseDec1;
		this.imgUrl = imgUrl;
		this.coursePrice = coursePrice;
		this.courseTeacher = courseTeacher;
		this.courseCategory = courseCategory;
		this.courseLevel = courseLevel;
	}
	
}
