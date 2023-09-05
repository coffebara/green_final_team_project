//package com.itdaLearn.entity;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.transaction.Transactional;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//
//import com.querydsl.jpa.impl.JPAQueryFactory;
//
//@SpringBootTest
//@Transactional
//@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
//public class QCourseTest {
//	
//	@PersistenceContext
//	   EntityManager em;
//
//	@Test
//	void contextLoads() {
//		Course course = new Course();
//		em.persist(course);
//		
//		JPAQueryFactory query = new JPAQueryFactory(em);
//		
//		QCourse qCourse = new QCourse("c");
//		
//		Course result = query
//				.selectFrom(qCourse)
//				.fetchOne();
//		
//		assertEquals(result, course);
////		assertEquals(result.getCourseNo(), course.getCourseNo());
//		
//	}
//}
