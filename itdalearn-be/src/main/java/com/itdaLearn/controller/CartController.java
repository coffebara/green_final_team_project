package com.itdaLearn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itdaLearn.dto.CartCourseDto;
import com.itdaLearn.dto.CartDetailDto;
import com.itdaLearn.dto.CartOrderDto;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.MemberRepository;
import com.itdaLearn.service.CartService;
import com.itdaLearn.service.PrincipalDetails;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CartController {
	
	private final CartService cartService;
	private final MemberRepository memberRepository;

	   
	   @PostMapping(value= "/cart")

	   public @ResponseBody ResponseEntity order(@RequestBody @Valid CartCourseDto cartCourseDto, BindingResult bindingResult, Authentication authentication) {
		

		   PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		   System.out.println("principalDetails: " + principalDetails.toString());

	      if(bindingResult.hasErrors()) {
	
	         StringBuilder sb = new StringBuilder();
	         List<FieldError> fieldErrors = bindingResult.getFieldErrors();
	         
	         for(FieldError fieldError : fieldErrors) {
	            sb.append(fieldError.getDefaultMessage());
	         }
	         
	         return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
	      }
	      


	      String memberNo = principalDetails.getMember().getMemberNo(); //null
	      System.out.println(memberNo);

	     
	      Long cartCourseNo;
	      
	      try {
	         cartCourseNo = cartService.addCart(cartCourseDto, memberNo);
	
	      } catch(Exception e) {
	         return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
	      }
	      return new ResponseEntity<Long>(cartCourseNo, HttpStatus.OK);
	   }
	   
	   @ResponseBody
	   @GetMapping(value="/cart")
	   public Map<String, Object> orderHist(Authentication authentication, Model model) {
		  
		   PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		   String memberNo = principalDetails.getMember().getMemberNo();
		   
	      List<CartDetailDto> cartDetailList = cartService.getCartList(memberNo);
	
	      Map<String, Object> cartlist = new HashMap<>();
	      
	      cartlist.put("cartCources", cartDetailList);
	     
	      return cartlist;     
	   }
	   
	   @PostMapping(value = "/cart/orders")
	   public @ResponseBody ResponseEntity orderCartItem(@RequestBody CartOrderDto cartOrderDto, Authentication authentication) {
		

		   PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		   List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList();
//		 
		   if(cartOrderDtoList == null || cartOrderDtoList.size() == 0 ) {
			   //주문할 상품을 선택하지 않았는지 체크합니다. 
			   return new ResponseEntity<String>("주문할 상품을 선택해주세요", HttpStatus.FORBIDDEN);	   
		   }
		   
		   for( CartOrderDto cartOrder : cartOrderDtoList) {
			
			   String memberNo = principalDetails.getMember().getMemberNo();
			   if(!cartService.validateCartCourse(cartOrder.getCartCourseNo(), memberNo)) {
				    return new ResponseEntity<String>("주문 권한이 없습니다.", HttpStatus.FORBIDDEN);
			   }
		   }
		   String memberNo = principalDetails.getMember().getMemberNo();
		   Long orderNo = cartService.orderCartCourse(cartOrderDtoList, memberNo);
				   				 
		   return new ResponseEntity<Long>(orderNo, HttpStatus.OK);
	   }
	   
	   
	  
	   @DeleteMapping(value = "/cartCourse/{cartCourseNo}")
	   //http메서드에서 delete의 경우 요청된 자원을 삭제할 때 사용
	   public @ResponseBody ResponseEntity deleteCartItem(@PathVariable("cartCourseNo") Long cartCourseNo, PrincipalDetails principalDetails) {
		   
		   String memberNo = principalDetails.getMember().getMemberNo();
		   
		   if(!cartService.validateCartCourse(cartCourseNo, memberNo)){
//				   principal.getName())) {
			   // 수정 권한을 체크합니다. 
			   return new ResponseEntity<String>("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
		   }
		   cartService.deleteCartCourse(cartCourseNo);
		   //해당 장바구니 상품을 삭제합니다. 
		   return new ResponseEntity<Long>(cartCourseNo, HttpStatus.OK);
	   }
}
