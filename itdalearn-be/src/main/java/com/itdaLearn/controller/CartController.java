package com.itdaLearn.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itdaLearn.dto.CartCourseDto;
import com.itdaLearn.dto.CartDetailDto;
import com.itdaLearn.dto.CartOrderDto;
import com.itdaLearn.service.CartService;


import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CartController {
	
	private final CartService cartService;
	   
	   @PostMapping(value= "/cart")
	   public @ResponseBody ResponseEntity order(@RequestBody @Valid CartCourseDto cartCourseDto, BindingResult bindingResult, Principal principal) {
	      
	      if(bindingResult.hasErrors()) {
	
	         StringBuilder sb = new StringBuilder();
	         List<FieldError> fieldErrors = bindingResult.getFieldErrors();
	         
	         for(FieldError fieldError : fieldErrors) {
	            sb.append(fieldError.getDefaultMessage());
	         }
	         
	         return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
	      }
	      
	      String email = "test@tester.com";
	
	      Long cartItemId;
	      
	      try {
	         cartItemId = cartService.addCart(cartCourseDto, email);
	
	      } catch(Exception e) {
	         return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
	      }
	      return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
	   }
	   
	   @ResponseBody
	   @GetMapping(value="/cart")
	   public Map<String, Object> orderHist(Principal principal, Model model) {
		  
		   String email = "test@tester.com";
		   
	      List<CartDetailDto> cartDetailList = cartService.getCartList(email);
	
	      Map<String, Object> cartlist = new HashMap<>();
	      
	      cartlist.put("cartCources", cartDetailList);
	      System.out.println(cartlist);
	      return cartlist;     
	   }
	   
	   @PostMapping(value = "/cart/orders")
	   public @ResponseBody ResponseEntity orderCartItem( CartOrderDto cartOrderDto, Principal principal) {
		   
		   List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList();
		   
		   if(cartOrderDtoList == null || cartOrderDtoList.size() == 0 ) {
			   //주문할 상품을 선택하지 않았는지 체크합니다. 
			   return new ResponseEntity<String>("주문할 상품을 선택해주세요", HttpStatus.FORBIDDEN);	   
		   }
		   
		   for( CartOrderDto cartOrder : cartOrderDtoList) {
			
			   String email = "test@tester.com";
			   if(!cartService.validateCartCourse(cartOrder.getCartCourseNo(), email)) {
				    return new ResponseEntity<String>("주문 권한이 없습니다.", HttpStatus.FORBIDDEN);
			   }
		   }
		   String email = "test@tester.com";
		   Long orderNo = cartService.orderCartCourse(cartOrderDtoList, email);
				   				 
		   return new ResponseEntity<Long>(orderNo, HttpStatus.OK);
	   }
}
