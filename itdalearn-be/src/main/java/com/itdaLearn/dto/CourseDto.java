package com.itdaLearn.dto;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CourseDto {

	private Long courseNo;
	private String courseTitle;
	private String courseDec1;
	private String courseDec2;
	private String courseDec3;
	private Integer coursePrice;
	private CourseLevel courseLevel;
	private CourseCategory courseCategory;
	
}
