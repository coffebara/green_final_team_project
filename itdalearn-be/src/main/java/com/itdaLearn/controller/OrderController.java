package com.itdaLearn.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import javax.validation.Valid;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itdaLearn.dto.OrderDto;
import com.itdaLearn.dto.OrderHistDto;
import com.itdaLearn.service.OrderService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class OrderController {

	
	private final OrderService orderService;
	
	@PostMapping(value = "/order")
	public @ResponseBody ResponseEntity order(@RequestBody @Valid OrderDto orderDto
			, BindingResult bindingResult, Principal principal) {
		
		if(bindingResult.hasErrors()) {
			
			StringBuilder sb = new StringBuilder();
			List<FieldError> fieldErrors = bindingResult.getFieldErrors();
			
			for(FieldError fieldError : fieldErrors) {
				sb.append(fieldError.getDefaultMessage());
			}
			return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
			
		}
		String email = "test@tester.com";
		//	principal.getName();
		// 현재 로그인 유저의 정보를 얻기 위해서 @Controller 어노테이션이 선언된 클래스에서 메소드 인자로 principal 
		//객체로 넘겨줄 경우 해당 객체에 직접 접근할 수 있습니다. 
		//principal 객체에서 현재 로그인한 회원의 이메일 정보를 조회합니다.
		Long orderNo;
		
		try {
			orderNo = orderService.order(orderDto, email);
			//화면으로부터 넘어오는 주문 정보와 회원의 이메일 정보를 이용하여 주문 로직을 호출합니다. 
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Long>(orderNo, HttpStatus.OK);
	}
	
	@GetMapping(value = "/orders")
	@ResponseBody
	public Map<String, Object> orderHist() {
		
		String email = "test@tester.com";
		
		List<OrderHistDto> orderHistDtoList = orderService.getOrderList(email);
		Map<String, Object> orderlist = new HashMap<>();
		orderlist.put("orders", orderHistDtoList);
		return orderlist;
	}

	
}
