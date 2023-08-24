package com.itdaLearn.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartOrderDto {
	
	private Long cartCourseNo;
	private List<CartOrderDto> cartOrderDtoList;
	
}
