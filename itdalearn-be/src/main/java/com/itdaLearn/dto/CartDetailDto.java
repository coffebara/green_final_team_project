package com.itdaLearn.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartDetailDto {
	
	 private Long cartCourseNo; // 장바구니 상품 아이디 
	 
	 private String courseTitle;
	 
	 private int coursePrice;
	 
	 private String imgUrl;
	 

	 public CartDetailDto(Long cartCourseNo, String courseTitle, int coursePrice, String imgUrl) {
		 this.cartCourseNo = cartCourseNo;
		 this.courseTitle = courseTitle;
		 this.coursePrice = coursePrice;
		 this.imgUrl = imgUrl;
	 }

}
