package com.itdaLearn.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;


import com.itdaLearn.dto.CourseSearchDto;
import com.itdaLearn.dto.MainCourseDto;

import com.itdaLearn.service.CourseService;


import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Controller
public class HomeController {
	

	
	 private final CourseService courseService;
	 
	 @GetMapping(value = {"/main", "/main/{page}" })
	 @ResponseBody
	 public Map<String, Object> main(CourseSearchDto courseSearchDto, @PathVariable("page") Optional<Integer> page) {
		 
		 Pageable pageable = PageRequest.of(page.isPresent()? page.get() : 0, 9);
		 Page<MainCourseDto> courses = courseService.getMainItemPage(courseSearchDto, pageable);
		 
		 Map<String, Object> courseMng = new HashMap<>();
		 courseMng.put("courseList", courses);
			// 조회한 상품 데이터 및 페이징 정보를 뷰에 전달합니다.
		 courseMng.put("courseSearchDto", courseSearchDto);
			// 페이지 전환 시 기존 검색 조건을 유지한 채 이동할 수 있도록 뷰에 다시 전달

		 return courseMng;
	 }	
}
