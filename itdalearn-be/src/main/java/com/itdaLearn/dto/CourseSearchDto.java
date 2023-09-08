package com.itdaLearn.dto;

import com.itdaLearn.constant.SellStatus;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CourseSearchDto {
	
	private SellStatus searchSellStatus;
	
	private String searchBy;

	private String searchQuery = "";
}
