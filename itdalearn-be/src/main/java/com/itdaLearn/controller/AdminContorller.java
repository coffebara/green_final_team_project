package com.itdaLearn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.repository.CourseRepository;
import com.itdaLearn.service.CourseService;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
public class AdminContorller {

	private final CourseService courseService;
	private final CourseRepository courseRepository;
	
	@GetMapping("/admin/courses")	
	@ResponseBody
	public Map<String, Object> courseList() {
		
		Map<String, Object> courseList = new HashMap<String, Object>();
		List courses = courseRepository.findAll();
		courseList.put("courseList", courses);
		
		return courseList;
		
	}
	
	@PostMapping(value= "/admin/course")
	public String itemNew(@Valid CourseFormDto courseFormDto, BindingResult bindingResult, 
			Model model) {

		System.out.println(courseFormDto.toString());
		
		if(bindingResult.hasErrors()) {
			System.out.println(bindingResult.toString());
			return "redirect:/admin/courses";
		}

		try {
			courseService.saveCourse(courseFormDto);
			
//상품 저장 로직을 호출합니다. 매개 변수로 상품 정보와 상품 이미지 정보를 담고 있는 itemImgFileList를 넘겨줍니다.			
		} catch (Exception e) {
			System.out.println("야호 실패!");
			model.addAttribute("errorMessage","상품 등록 중 에러가 발생하였습니다.");
			return "item/itemForm";
		}
		return "redirect:/admin/courses";
	}//상품이 정상적으로 등록되었다면 메인 페이지로 이동
}
