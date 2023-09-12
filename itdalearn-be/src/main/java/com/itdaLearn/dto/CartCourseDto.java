package com.itdaLearn.dto;


import java.util.List;

import javax.validation.constraints.NotNull;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartCourseDto {

	@NotNull(message = "상품 아이디는 필수 입력 값입니다.")
	//장바구니 안에 같은 상품을 두번 넣을 수 없게 만들어야 한다. 	s
	private Long courseNo;
	
		
}
