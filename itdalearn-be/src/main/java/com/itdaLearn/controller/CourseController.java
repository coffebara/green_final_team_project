package com.itdaLearn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.repository.CourseRepository;
import com.itdaLearn.service.CourseService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CourseController {
	
	private final CourseService courseService;
	private final CourseRepository courseRepository;
		
	@GetMapping("/courses")	
	@ResponseBody
	public Map<String, Object> courseList() {
		
		Map<String, Object> courseList = new HashMap<String, Object>();
		List courses = courseRepository.findAll();
		courseList.put("courseList", courses);
		
		return courseList;		
	}
	
	@GetMapping(value = "/course/{id}")
	@ResponseBody
	public Map<String, Object> courseDetail(@PathVariable("id") Long courseNo) {

		Map<String, Object> courseInfo = new HashMap<>();

		try {
			CourseFormDto courseFormDto = courseService.getCourseDtl(courseNo);
			courseInfo.put("courseFormDto", courseFormDto);

		} catch (EntityNotFoundException e) {
			courseInfo.put("errorMessage", e);
		}

		return courseInfo;
	}
}
