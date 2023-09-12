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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.constant.SellStatus;
import com.itdaLearn.entity.Course;

@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public class CourseRepositoryTest {
   
   @Autowired CourseRepository courseRepository;
   
   @PersistenceContext
      EntityManager em;
   
   @Test
   @DisplayName("초기 코스 등록 테스트")
   @WithMockUser(username = "admin", roles="ADMIN")
   void createCourseTest() {
      Course course = new Course();
      course.setCourseTitle("스프링");

      course.setCourseDec1("테스트 설명");
      course.setCourseDec2("테스트 설명2");
      course.setCourseDec3("예제로 배워보는 스프링 MVC");

      course.setCoursePrice(40000);
      course.setCourseLevel(CourseLevel.HIGH);
      course.setCourseCategory(CourseCategory.BE);
      course.setSellStatus(SellStatus.SELL);
      
      Course savedCourse = courseRepository.save(course);
      
      System.out.println(courseRepository.findById(savedCourse.getCourseNo()).toString());
      
      assertEquals(courseRepository.findById(savedCourse.getCourseNo()), Optional.of(course));

   }
}