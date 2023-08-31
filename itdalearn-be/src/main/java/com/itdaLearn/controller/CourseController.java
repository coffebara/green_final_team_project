package com.itdaLearn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
	 @ResponseBody
	 @GetMapping(value = "/course/{courseNo}")
	    public Map<String, Object> itemDtl(Model model, @PathVariable Long courseNo) {
	    	
		    CourseFormDto courseFormDto = courseService.getCourseDtl(courseNo);
	    	
	    	Map<String, Object> coursedetailMap = new HashMap<>();
	    	
	    	coursedetailMap.put("course", courseFormDto);
	    	   	
	    	return coursedetailMap;
	    }//다음으로 상품 상세 페이지를 만들겠습니다. 

}
