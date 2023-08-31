package com.itdaLearn.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.entity.Course;

@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public class CourseRepositoryTest {
	
	@Autowired CourseRepository courseRepository;
	
	@PersistenceContext
	   EntityManager em;
	
	@Test
	@DisplayName("코스 등록 테스트")
	void createCourseTest() {
		Course course = new Course();
		course.setCourseTitle("스프링");

		course.setCourseDec1(null);

		course.setCourseDec1("예제로 배워보는 스프링 MVC");

		course.setCoursePrice(40000);
		course.setCourseLevel(CourseLevel.HIGH);
		course.setCourseCategory(CourseCategory.BE);
		
		Course savedCourse = courseRepository.save(course);
		
		System.out.println(courseRepository.findById(savedCourse.getCourseNo()).toString());
		
		assertEquals(courseRepository.findById(savedCourse.getCourseNo()), Optional.of(course));

		// jpaRepository의 return값은 optional로 나옴. 그럼 어떻게 비교를 해야하는가?
		// Optional.of(객체) 
	}
	
	//수정 테스트
	
	//삭제 테스트
	
	//조회 테스트

}
