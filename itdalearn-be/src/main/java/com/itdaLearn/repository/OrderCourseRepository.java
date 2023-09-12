package com.itdaLearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdaLearn.entity.CartCourse;
import com.itdaLearn.entity.OrderCourse;


public interface OrderCourseRepository extends JpaRepository<OrderCourse, Long>{

	
	
	OrderCourse findByOrderOrderNoAndCourseCourseNo( long orderNo, long courseNo);
	
}
