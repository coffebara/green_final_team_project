package com.itdaLearn.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.itdaLearn.dto.CartCourseDto;
import com.itdaLearn.dto.CartDetailDto;
import com.itdaLearn.dto.CartOrderDto;
import com.itdaLearn.dto.OrderDto;
import com.itdaLearn.entity.Cart;
import com.itdaLearn.entity.CartCourse;
import com.itdaLearn.entity.Course;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.CartCourseRespository;
import com.itdaLearn.repository.CartRepository;
import com.itdaLearn.repository.CourseRepository;
import com.itdaLearn.repository.MemberRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {
	
	private final CourseRepository courseRepository;
	private final MemberRepository memberRepository;
	private final CartRepository cartRepository;
	private final CartCourseRespository cartCourseRespository;
	private final OrderService orderService;
		
	public Long addCart(CartCourseDto cartCourseDto, String email) {
		      
		      Course course = courseRepository.findById(cartCourseDto.getCourseNo())
		    		  .orElseThrow(EntityNotFoundException::new);
		    	
		   
		      Member member = memberRepository.findByEmail(email);
		    
		      System.out.println(member);
		  
		      Cart cart = cartRepository.findByMemberId(member.getId());

		      if(cart == null) {
		
		         cart = Cart.createCart(member);
		         cartRepository.save(cart);
		      }
		      
		      //CartCourse savedCartCourse = cartCourseRespository.findByCartCartNoAndCourseCourseNo(cart.getCartNo(), course.getCourseNo());
		 
		      CartCourse cartCourse = CartCourse.createCartCourse(cart, course);
		       
		      cartCourseRespository.save(cartCourse);
		      
		      return cartCourse.getCartCourseNo();
		
		   }
	   
	   @Transactional(readOnly = true)
	   public List<CartDetailDto> getCartList(String email){
	      
	      List<CartDetailDto> cartDetailDtoList = new ArrayList<>();
	      
	     
	      
	      Member member = memberRepository.findByEmail(email);
	      
	      Cart cart = cartRepository.findByMemberId(member.getId());
	
	      if(cart == null) {
	
	         return cartDetailDtoList;
	      }
	    	
	      cartDetailDtoList = cartCourseRespository.findCartDetailDtoList(cart.getCartNo());
	      System.out.println(cartDetailDtoList);
	      return cartDetailDtoList;
	   }
	   
	   @Transactional(readOnly = true)
	
	   public boolean validateCartCourse(Long cartCourseNo, String email) {
		   
		  
		   Member curMember = memberRepository.findByEmail(email);
		   
		   CartCourse cartCourse = cartCourseRespository.findById(cartCourseNo)
				   .orElseThrow(EntityNotFoundException::new);
				
		   Member savedMember = cartCourse.getCart().getMember();
				  
		   if(!StringUtils.pathEquals(curMember.getEmail(), savedMember.getEmail())){
			   return false;
		   } 
 
		   return true;
	   }
	   
	   public void deleteCartCourse(Long cartCourseNo) {
		   
		    CartCourse cartCourse = cartCourseRespository.findById(cartCourseNo)
		    			.orElseThrow(EntityNotFoundException::new);
		    cartCourseRespository.delete(cartCourse);    	
	    }
	   
	   public Long orderCartCourse (List<CartOrderDto> cartOrderDtoList, String email) {
	    	
		   List<OrderDto> orderDtoList = new ArrayList<>();
	    	
	    	for(CartOrderDto cartOrderDto : cartOrderDtoList) {
	    		 //장바구니 페이지에서 전달받은 주문 상품 번호를 이용하여 주문 로직으로 전달할 orderDto객체를 만듭니다.    		
	    		CartCourse cartCourse = cartCourseRespository
	    				.findById(cartOrderDto.getCartCourseNo())
	    				.orElseThrow(EntityNotFoundException::new);
	    		
	    		OrderDto orderDto = new OrderDto();
	    		orderDto.setCourseNo(cartCourse.getCourse().getCourseNo());
	    		orderDtoList.add(orderDto);
	    	}
	    	
	    	Long orderNo = orderService.orders(orderDtoList, email);
	    	
	    	  for(CartOrderDto cartOrderDto : cartOrderDtoList) {
	    		  CartCourse cartCourse = cartCourseRespository
	    				  .findById(cartOrderDto.getCartCourseNo())
	    				  .orElseThrow(EntityNotFoundException::new);
	    		  
	    		  cartCourseRespository.delete(cartCourse);
	    		
	    	  }
	    	  return orderNo;
	     }
	    

}
	  