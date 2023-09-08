package com.itdaLearn.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itdaLearn.dto.CourseSearchDto;
import com.itdaLearn.dto.MainCourseDto;
import com.itdaLearn.entity.Course;

public interface CourseRepositoryCustom {

	Page<Course> getAdminCoursePage(CourseSearchDto courseSearchDto, Pageable pageable);
	Page<MainCourseDto> getMainItemPage(CourseSearchDto courseSearchDto, Pageable pageable);

}
