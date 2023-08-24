package com.itdaLearn.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderDto {
	
	@NotNull(message = "상품 아이디는 필수 입력 값입니다.")
	private Long courseNo;
	
	private String courseTitle;
	
	private int coursePrice;
	
}
