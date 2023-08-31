package com.itdaLearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdaLearn.entity.CourseImg;



public interface CourseImgRepository extends JpaRepository<CourseImg, Long>{
	
	CourseImg findByCourseCourseNo(Long courseNo);
}
