package com.itdaLearn.repository;

import java.util.List;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itdaLearn.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, QuerydslPredicateExecutor<Item>, CourseRepositoryCustom {

		List<Course> findByCourseTitle(String courseTitle);

		List<Course> findByCourseTitleOrCourseDec1(String courseTitle, String courseDec1);

		List<Course> findByCoursePriceLessThan(Integer coursePrice);

		List<Course> findByCoursePriceLessThanOrderByCoursePriceDesc(Integer coursePrice);

	//메서드에 대한 쿼리를 직접 정의
		@Query("select c from Course c where c.courseDec1 like " + "%:courseDec1% order by c.coursePrice desc")
		List<Course> findByCourseDec1(@Param("courseDec1") String courseDec1);

		
		@Query(value = "select * from course c where c.courseDec1 like "
				+ "%:courseDec1% order by c.coursePrice desc", nativeQuery = true)
		List<Course> findByCourseDec1ByNative(@Param("courseDec1") String courseDec1);
	}