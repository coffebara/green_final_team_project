package com.itdaLearn.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.repository.CourseRepository;

@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public class CourseServiceTest {
	
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private CourseService courseService;
	
	@Test
	@DisplayName("상품 등록 테스트")
	void saveCourse() throws Exception {
		CourseFormDto courseFormDto = new CourseFormDto();
		courseFormDto.setCourseTitle("테스트 자바 강의");
		courseFormDto.setCourseTeacher("김현승");
		courseFormDto.setCourseDec("테스트 강의 입니다.");
		courseFormDto.setCoursePrice(1000);
		courseFormDto.setCourseLevel(CourseLevel.LOW);
		courseFormDto.setCourseCategory(CourseCategory.BE);
		
//saveItem 메서드는 새로운 상품을 생성하고 이 상품의 ID를 반환합니다	
		Long courseId = courseService.saveCourse(courseFormDto);
//반환받은 상품  ID를 사용하여 상품 이미지 리스트와 상품 정보를 데이터베이스에서 조회합니다.		
		Course course = courseRepository.findById(courseId)
				.orElseThrow(EntityNotFoundException::new);
//데이터베이스에서 조회한 상품 정보와 이미지 파일명이 기대하는 값과 일치하는지 확인합니다.		
		assertEquals(courseFormDto.getCourseTitle(), course.getCourseTitle());
		assertEquals(courseFormDto.getCourseTeacher(), course.getCourseTeacher());
		assertEquals(courseFormDto.getCourseDec(), course.getCourseDec());
		assertEquals(courseFormDto.getCoursePrice(), course.getCoursePrice());
		assertEquals(courseFormDto.getCourseLevel(), course.getCourseLevel());
		assertEquals(courseFormDto.getCourseCategory(), course.getCourseCategory());
	}//테스트 관리자 권한으로 실행되도록 하고 saveItem 메서드가 관리자 권한을 가진 사용자만 호출할 수 있도록
}
