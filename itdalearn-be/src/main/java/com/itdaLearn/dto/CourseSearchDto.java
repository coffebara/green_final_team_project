package com.itdaLearn.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CourseSearchDto {
	
	private String searchBy;

	private String searchQuery = "";
}
