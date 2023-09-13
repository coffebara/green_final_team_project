package com.itdaLearn.service;

import java.util.ArrayList;
import java.util.List;

import javax.imageio.spi.ImageTranscoderSpi;
import javax.persistence.EntityNotFoundException;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.itdaLearn.dto.CourseDto;
import com.itdaLearn.dto.OrderCourseDto;
import com.itdaLearn.dto.OrderDto;
import com.itdaLearn.dto.OrderHistDto;
import com.itdaLearn.entity.CartCourse;
import com.itdaLearn.entity.Course;
import com.itdaLearn.entity.CourseImg;
import com.itdaLearn.entity.Member;
import com.itdaLearn.entity.Order;
import com.itdaLearn.entity.OrderCourse;
import com.itdaLearn.repository.CourseImgRepository;
import com.itdaLearn.repository.CourseRepository;
import com.itdaLearn.repository.MemberRepository;
import com.itdaLearn.repository.OrderCourseRepository;
import com.itdaLearn.repository.OrderRepository;


import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
	
	private final CourseRepository courseRepository;
	private final MemberRepository memberRepository;
	private final OrderRepository orderRepository;
	private final CourseImgRepository courseImgRepository;
	private final OrderCourseRepository orderCourseRepository;
	//String email
	public Long order(OrderDto orderDto, String memberNo) throws Exception {
				
		Course course = courseRepository.findById(orderDto.getCourseNo())
				.orElseThrow(EntityNotFoundException::new);


		Member member = memberRepository.findByMemberNo(memberNo);
		
				
		List<OrderCourse> orderCourseList = new ArrayList<>();

		List<Order> orders = orderRepository.findOrders(memberNo);
	      for(Order order : orders) {
	         for(OrderCourse orderCourse: order.getOrderCourses()) {
	            System.out.println(orderCourse.getCourse().getCourseNo());
	            System.out.println(orderDto.getCourseNo());
	            if(orderCourse.getCourse().getCourseNo() == orderDto.getCourseNo()) {
	               System.out.println("주문 실패");
	               throw(new Exception("같은 상품은 주문할 수 없습니다."));
	            }
	         }
	      }
		
		OrderCourse orderCourse = OrderCourse.createOrderCourse(course);
		
		orderCourseList.add(orderCourse);
	
		Order order = Order.createOrder(member, orderCourseList);
		

		orderRepository.save(order);
		
		return order.getOrderNo(); 
		
		
	}
	
	@Transactional(readOnly = true)//String email
	public List<OrderHistDto> getOrderList(String memberNo){
		
		List<Order> orders = orderRepository.findOrders(memberNo);
	
		List<OrderHistDto> orderHistDtos = new ArrayList<>();
		
		
		for(Order order : orders) {
			
			OrderHistDto orderHistDto = new OrderHistDto(order);
			
			List<OrderCourse> orderCourses = order.getOrderCourses();
			
			for( OrderCourse orderCourse : orderCourses) {
				
				CourseImg courseImg = courseImgRepository.findByCourseCourseNoAndRepimgYn(orderCourse.getCourse().getCourseNo(),"Y");
				
				OrderCourseDto orderCourseDto = new OrderCourseDto(orderCourse, courseImg.getImgUrl());
				
				orderHistDto.addOrderCourseDto(orderCourseDto);
						
			}
			orderHistDtos.add(orderHistDto);
		}
		System.out.println(orderHistDtos);
		return orderHistDtos;
		
	}
	

	@Transactional(readOnly = true)//String email
	public boolean validateOrder(Long orderNo, String memberNo) {
		//.findByEmail(email);
		Member curMember = memberRepository.findByMemberNo(memberNo);
				
		
		Order order = orderRepository.findById(orderNo)
				.orElseThrow(EntityNotFoundException::new);
		
		Member savedMember = order.getMember();
		
		if(!StringUtils.pathEquals(curMember.getMemberNo(), savedMember.getMemberNo())) {
			return false;
		}
		return true;
	}
	
	public void cancelOrder(Long orderNo) {
		Order order = orderRepository.findById(orderNo)
				.orElseThrow(EntityNotFoundException::new);
		order.cancleOrder();
		
	}
	
	//String email
	public Long orders(List<OrderDto> orderDtoList, String memberNo) {
		
		//.findByEmail(email);
		Member member = memberRepository.findByMemberNo(memberNo);
						
		List<OrderCourse> orderCourseList = new ArrayList<>();
		
		for(OrderDto orderDto : orderDtoList) {
			//주문할 상품 리스트를 만들어 줍니다. 
					
			Course course = courseRepository.findById(orderDto.getCourseNo())
					.orElseThrow(EntityNotFoundException::new);
			
//			List<Order> orders = orderRepository.findOrders(memberNo);
//			  
//			for(Order order : orders) {
//			     
//				for(OrderCourse orderCourse: order.getOrderCourses()) {
//			      System.out.println(orderCourse.getCourse().getCourseNo());
//			      System.out.println(orderDto.getCourseNo());
//			        if(orderCourse.getCourse().getCourseNo() == orderDto.getCourseNo()) {
//			           System.out.println("주문 실패");
//			               throw(new Exception("같은 상품은 주문할 수 없습니다."));
//			            }
//			         }
//			      }
		
			OrderCourse orderCourse = OrderCourse.createOrderCourse(course);
			orderCourseList.add(orderCourse);
		}
		
		Order order = Order.createOrder(member, orderCourseList);
		// 현재 로그인한 회원과 주문 상품 목록을 이용하여 주문 엔티티를 만듭니다. 
		orderRepository.save(order);
		//주문 데이터를 저장합니다. 
		return order.getOrderNo();
 	}
	
	

}
