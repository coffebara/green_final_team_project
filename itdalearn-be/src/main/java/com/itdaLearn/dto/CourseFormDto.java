package com.itdaLearn.dto;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.constant.SellStatus;
import com.itdaLearn.entity.Course;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CourseFormDto {
	

	private Long courseFormDtoNo;

	@NotBlank(message= "강의명은 필수 입력값입니다.")

	private String courseTitle;
	
	@NotBlank(message= "강사명은 필수 입력값입니다.")
	private String courseTeacher;
	
	@NotNull(message= "가격은 필수 입력값입니다.")
	private Integer coursePrice;
	

	@NotBlank(message= "강의 설명은 필수 입력값입니다.")
	private String courseDec1;
	
	@NotBlank(message= "강의 설명은 필수 입력값입니다.")
	private String courseDec2;
	
	@NotBlank(message= "강의 설명은 필수 입력값입니다.")
	private String courseDec3;
	
	private SellStatus sellStatus;
	private CourseLevel courseLevel;
	private CourseCategory courseCategory;
	
	private List<CourseImgDto> courseImgDtoList = new ArrayList<>(); 

	private List<Long> courseImgNos = new ArrayList<>();
	
	private static ModelMapper modelMapper = new ModelMapper();
	
	public Course createCourse() {
		return modelMapper.map(this, Course.class);
	}

	public static CourseFormDto of(Course course) {
		return modelMapper.map(course, CourseFormDto.class);
	}
}
