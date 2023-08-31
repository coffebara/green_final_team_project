package com.itdaLearn.dto;

import org.modelmapper.ModelMapper;

import com.itdaLearn.entity.CourseImg;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CourseImgDto {

	private Long courseImgDtoNo;
	private String imgName;
	private String oriImgName;
	private String imgUrl;

	private static ModelMapper modelMapper = new ModelMapper();
	
	public static CourseImgDto of(CourseImg courseImg) {

		return modelMapper.map(courseImg,  CourseImgDto.class);
	}
}
