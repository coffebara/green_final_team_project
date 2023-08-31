package com.itdaLearn.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.dto.CartCourseDto;
import com.itdaLearn.dto.CartDetailDto;
import com.itdaLearn.entity.Cart;
import com.itdaLearn.entity.CartCourse;
import com.itdaLearn.entity.Course;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.CartCourseRespository;
import com.itdaLearn.repository.CartRepository;
import com.itdaLearn.repository.CourseRepository;
import com.itdaLearn.repository.MemberRepository;


@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public class CartServiceTest {
	
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	CartService cartService;
	
	@Autowired
	CartCourseRespository cartCourseRespository;
	
	@Autowired
	CartRepository cartRepository;
	
	
	public Course saveCourse() {//테스트를 위해서 장바구니에 담을 상품과
		Course course = new Course();
		course.setCourseTitle("테스트 상품");
		course.setCourseTeacher("김현승");
		course.setCourseLevel(CourseLevel.LOW);
		course.setCourseCategory(CourseCategory.BE);
		course.setCoursePrice(20000);
		course.setCourseDec1("테스트 상품 상세설명입니다");
	
		return courseRepository.save(course);
		
	}
//회원 정보를 저장하는 메서드를 생성합니다.
//테스트를 위한 회원 정보를 생성하고 데이터베이스에 저장한 뒤, 저장된 회원 엔티티를 반환합니다
	public Member saveMember() {
		Member member = new Member();
		member.setEmail("test@test.com");
		return memberRepository.save(member);
	}
	
	@Test
	@DisplayName("장바구니 담기 테스트")
	public void addCart() {
		
		Course course = saveCourse();
		Member member = saveMember();
		
		
		CartCourseDto cartCourseDto = new CartCourseDto();
		cartCourseDto.setCourseNo(course.getCourseNo());
	
		Long cartCourseId = cartService.addCart(cartCourseDto, member.getEmail());
		
		CartCourse cartCourse = cartCourseRespository.findById(cartCourseId)
				.orElseThrow(EntityNotFoundException::new);
	
		assertEquals(course.getCourseNo(), cartCourse.getCourse().getCourseNo());
	
	}

}
