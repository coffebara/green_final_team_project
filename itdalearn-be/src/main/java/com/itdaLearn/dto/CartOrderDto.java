package com.itdaLearn.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class CartOrderDto {
	
	private Long cartCourseNo;
	private List<CartOrderDto> cartOrderDtoList;
	
}
