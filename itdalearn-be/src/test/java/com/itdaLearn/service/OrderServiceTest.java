package com.itdaLearn.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.TestPropertySource;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.constant.OrderStatus;
import com.itdaLearn.constant.SellStatus;
import com.itdaLearn.dto.OrderDto;
import com.itdaLearn.dto.OrderHistDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.entity.Member;
import com.itdaLearn.entity.Order;
import com.itdaLearn.entity.OrderCourse;
import com.itdaLearn.repository.CourseRepository;
import com.itdaLearn.repository.MemberRepository;
import com.itdaLearn.repository.OrderRepository;




@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public class OrderServiceTest {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	CourseRepository courseRepository;

	@Autowired
	MemberRepository memberRepository;
	
	
public Course saveCourse() {//테스트를 위해서 장바구니에 담을 상품과
		

		Course course = new Course();
		course.setCourseTitle("테스트 상품");
		course.setCourseTeacher("김현승");
		course.setCourseLevel(CourseLevel.LOW);
		course.setCourseCategory(CourseCategory.BE);
		course.setCoursePrice(20000);
		course.setCourseDec1("테스트 상품 상세설명입니다");
		course.setCourseDec2("테스트 상세설명입니다2");
		course.setCourseDec3("테스트 상품 상세설명입니다3");
		course.setSellStatus(SellStatus.SELL);
		course.setSellCount(1);
		
	
		return courseRepository.save(course);
		
	}

public Member saveMember() {
	
	Member member = new Member();
	member.setMemberEmail("test@tester.com");
	member.setMemberNo("tester");
	member.setMemberPwd("12345678");
	member.setMemberName("user");
	member.setRole("ROLE_USER");
	member.setMemberTel("010-111-1111");

	
	return memberRepository.save(member);
}

	
	@Test
	@DisplayName("주문 테스트")
	public void order() throws Exception {
		
		Course course = saveCourse();
		Member member = saveMember();
		
		OrderDto orderDto = new OrderDto();
	
		orderDto.setCourseNo(course.getCourseNo());

		Long orderId = orderService.order(orderDto, member.getMemberNo());
		
		Order order = orderRepository.findById(orderId)//주문 번호를 이용하여 저장된 주문 정보를 조회합니다.				
				.orElseThrow(EntityNotFoundException::new);
		List<OrderCourse> orderCourses = order.getOrderCourses();
		int  totalPrice = course.getCoursePrice();
		
		assertEquals(totalPrice, order.getTotalPrice());
	}//주문한 상품의 총 가격과 데이터베이스에 저장된 상품의
	
	@Test
	@DisplayName("주문 취소 테스트")
	public void cancelOrder() throws Exception {
		
		Course course = saveCourse();
		Member member = saveMember();

		OrderDto orderDto = new OrderDto();
		
		orderDto.setCourseNo(course.getCourseNo());
	
		Long orderId = orderService.order(orderDto, member.getMemberNo());
	
		Order order = orderRepository.findById(orderId) //주문 엔티티를 조회합니다
				.orElseThrow(EntityNotFoundException::new);
		orderService.cancelOrder(orderId);

		assertEquals(OrderStatus.CANCEL, order.getOrderStatus());
	}
	

	
	
}
