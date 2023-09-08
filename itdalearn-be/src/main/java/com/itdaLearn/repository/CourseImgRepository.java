package com.itdaLearn.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdaLearn.entity.CourseImg;


public interface CourseImgRepository extends JpaRepository<CourseImg, Long>{
	
	List<CourseImg> findByCourseCourseNoOrderByCourseImgNo(Long courseNo);
	
	CourseImg findByCourseCourseNoAndRepimgYn(Long CourseNo, String repimgYn);
	
}
