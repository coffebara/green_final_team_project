package com.itdaLearn.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.intThat;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.TestPropertySource;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.constant.SellStatus;
import com.itdaLearn.repository.CourseRepository;
import com.itdaLearn.repository.MemberRepository;
import com.itdaLearn.repository.OrderCourseRepository;
import com.itdaLearn.repository.OrderRepository;


@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public class OrderTest {
	
	@Autowired
	OrderRepository orderRepository;
	
	@PersistenceContext
	EntityManager em;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	OrderCourseRepository orderCourseRepository;
	
	public Course createCourse() {//테스트를 위해서 장바구니에 담을 상품과
		

		Course course = new Course();
		course.setCourseTitle("테스트 상품");
		course.setCoursePrice(20000);
		course.setCourseTeacher("김현승");
		course.setCourseLevel(CourseLevel.LOW);
		course.setCourseCategory(CourseCategory.BE);
		course.setSellStatus(SellStatus.SELL);
		course.setSellCount(1);
		course.setCourseDec1("테스트 상품 상세설명입니다");
		course.setCourseDec2("테스트 상세설명입니다2");
		course.setCourseDec3("테스트 상품 상세설명입니다3");
	
		return course;
		
	}
	
		public Member saveMember() {
		
		Member member = new Member();
		member.setMemberEmail("test@tester.com");
		member.setMemberNo("tester");
		member.setMemberPwd("12345678");
		member.setMemberName("user");
		member.setRole("ROLE_USER");
		member.setMemberTel("010-111-1111");
		memberRepository.save(member);
		
		return member;
	}
	
	@Test
	@DisplayName("영속성 전이 테스트")
	public void cascadeTest() {
		Order order = new Order();
		
		for(int i = 0; i<3; i++) {
			Course course = this.createCourse();
			courseRepository.save(course);
			OrderCourse orderCourse = new OrderCourse();
			orderCourse.setCourse(course);
			orderCourse.setOrderPrice(1000);
			orderCourse.setOrder(order);
			order.getOrderCourses().add(orderCourse);
		}
		orderRepository.saveAndFlush(order);
		em.clear();
		
		Order savedOrder = orderRepository.findById(order.getOrderNo())
				.orElseThrow(EntityNotFoundException::new);
		assertEquals(3, savedOrder.getOrderCourses().size());
	}
	
	public Order createOrder(){
		
		Order order = new Order();
		
		for(int i = 0; i<3; i++) {
			Course course = this.createCourse();
			courseRepository.save(course);
			OrderCourse orderCourse = new OrderCourse();
			orderCourse.setCourse(course);
			orderCourse.setOrderPrice(1000);
			orderCourse.setOrder(order);
			order.getOrderCourses().add(orderCourse);
		}
		Member member = saveMember();
		memberRepository.save(member);
		order.setMember(member);
		orderRepository.save(order);
		return order;		
	}
	
	@Test
	@DisplayName("고아 객체 제거 테스트")
	public void orphanRemovalTest() {
		
		Order order = this.createOrder();
		order.getOrderCourses().remove(0);
		em.flush();
	}
	
	@Test
	@DisplayName("지연로딩 테스트")
	public void lazyLoadingTest() {
		Order order = this.createOrder();
		Long orderCourseNo = order.getOrderCourses().get(0).getOrderCourseNo();
		em.flush();
		em.clear();
		OrderCourse orderCourse = orderCourseRepository.findById(orderCourseNo)
				.orElseThrow(EntityNotFoundException::new);
		orderCourse.getOrder().getOrderDate();
	}
	

}
