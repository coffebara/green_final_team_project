package com.itdaLearn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.dto.CourseSearchDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.service.CourseService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AdminContorller {

	private final CourseService courseService;
	
	// 관리자 페이지 권한 인증
	@GetMapping(value="/admin")
	public void checkAdmin() {
		
		
	}
	

	// 코스 메인 페이지
	@GetMapping(value = { "/admin/courses", "/admin/courses/{page}" })
	@ResponseBody
	public Map<String, Object> courseManage(CourseSearchDto courseSerachDto,
			@PathVariable("page") Optional<Integer> page) {
			
		Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 1);
		Page<Course> course = courseService.getAdminCoursePage(courseSerachDto, pageable);
		Map<String, Object> courseMng = new HashMap<>();
		// 조회 조건과 페이징 정보를 파라미터로 넘겨서 Page<Item> 객체를 반환 받습니다
		courseMng.put("courseList", course);
		// 조회한 상품 데이터 및 페이징 정보를 뷰에 전달합니다.
		courseMng.put("courseSearchDto", courseSerachDto);
		// 페이지 전환 시 기존 검색 조건을 유지한 채 이동할 수 있도록 뷰에 다시 전달
		return courseMng;
	}
	
	

	// 코스 생성
	@PostMapping(value = "/admin/course")
	@ResponseBody
	public ResponseEntity courseNew(@Valid CourseFormDto courseFormDto, BindingResult bindingResult,
			@RequestParam("courseImgFile") List<MultipartFile> courseImgFileList) {
		
		if (bindingResult.hasErrors()) {
			System.out.println("검증 오류 발생");
			return new ResponseEntity<String>("검증 오류 발생.", HttpStatus.FOUND);
		}

		if (courseImgFileList.get(0).isEmpty() && courseFormDto.getCourseFormDtoNo() == null) {
			System.out.println("첫 이미지 오류 발생");
			return new ResponseEntity<String>("상품 이미지는 필수 입력값입니다.", HttpStatus.FOUND);
		}

		try {
			courseService.saveCourse(courseFormDto, courseImgFileList);
		} catch (Exception e) {
			return new ResponseEntity<String>("상품 등록 중 에러 발생.", HttpStatus.FOUND);
		}
		return new ResponseEntity<String>("생성되었습니다.", HttpStatus.OK);
	}

	// 코스 상세보기
	@GetMapping(value = "/admin/course/{id}")
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

	// 코스 수정
	@PatchMapping(value = "/admin/course/{id}")
	@ResponseBody
	public ResponseEntity updateCourse(@Valid CourseFormDto courseFormDto, BindingResult bindingResult,
			@RequestParam("courseImgFile") List<MultipartFile> courseImgFileList) {

		if(bindingResult.hasErrors()) {
			System.out.println("검증 오류 발생");
//			return new ResponseEntity<String>("검증 오류 발생.", HttpStatus.FOUND);
		}
		if (courseImgFileList.get(0).isEmpty() && courseFormDto.getCourseFormDtoNo() == null) {
			System.out.println("첫 이미지 오류 발생");
			return new ResponseEntity<String>("상품 이미지는 필수 입력값입니다.", HttpStatus.FOUND);
		}
		
		try {
			System.out.println(courseImgFileList.size());
			courseService.updateCourse(courseFormDto, courseImgFileList);
		} catch (Exception e) {
			return new ResponseEntity<String>("상품 등록 중 에러 발생.", HttpStatus.FOUND);
		}

		return new ResponseEntity<String>("수정되었습니다.", HttpStatus.OK);

	}

	// 코스 삭제
	@DeleteMapping(value = "/admin/course/{id}")
	@ResponseBody

	public ResponseEntity deleteCourse(@PathVariable("id") Long courseNo) {

		try {
			courseService.deleteCouseByNo(courseNo);

		} catch (EntityNotFoundException e) {
			System.out.println(e);
		}

		return new ResponseEntity<Long>(courseNo, HttpStatus.FOUND);
	}

}
