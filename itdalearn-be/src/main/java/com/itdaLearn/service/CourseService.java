package com.itdaLearn.service;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.repository.CourseRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {
	
	private final CourseRepository courseRepository;
	

	public void couseDeleteByNo(Long courseId) {
		courseRepository.deleteById(courseId);
	}
	
	public Long saveCourse(CourseFormDto courseFormDto) throws Exception{
		
				Course course = courseFormDto.createCourse();
		
				courseRepository.save(course);
			

				return course.getCourseNo();
			}
	
	@Transactional(readOnly = true)
	public CourseFormDto getCourseDtl(Long courseId) {

		Course course = courseRepository.findById(courseId)
				.orElseThrow(EntityNotFoundException::new);
	
		CourseFormDto courseFormDto = CourseFormDto.of(course);
		System.out.println(courseFormDto);
		return courseFormDto;
		
		
	}	
	
}
