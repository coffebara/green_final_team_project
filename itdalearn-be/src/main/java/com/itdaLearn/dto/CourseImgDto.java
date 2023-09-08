package com.itdaLearn.dto;

import org.modelmapper.ModelMapper;

import com.itdaLearn.entity.CourseImg;

import lombok.Getter;
import lombok.Setter;

import lombok.ToString;

@Getter @Setter
@ToString

public class CourseImgDto {

	private Long courseImgNo;
	private String imgName;
	private String oriImgName;
	private String imgUrl;

	private static ModelMapper modelMapper = new ModelMapper();
	
	public static CourseImgDto of(CourseImg courseImg) {

		return modelMapper.map(courseImg,  CourseImgDto.class);
	}
}
