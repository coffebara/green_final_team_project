package com.itdaLearn.service;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.dto.CourseImgDto;
import com.itdaLearn.dto.CourseSearchDto;
import com.itdaLearn.dto.MainCourseDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.entity.CourseImg;
import com.itdaLearn.repository.CourseImgRepository;
import com.itdaLearn.repository.CourseRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {

	private final CourseRepository courseRepository;
	private final CourseImgService courseImgService;
	private final CourseImgRepository courseImgRepository;

	// 코스 생성
	public Long saveCourse(CourseFormDto courseFormDto, MultipartFile courseImgFile) throws Exception {

		Course course = courseFormDto.createCourse();
		courseRepository.save(course);

		CourseImg courseImg = new CourseImg();
		courseImg.setCourse(course);

		courseImgService.saveCourseImg(courseImg, courseImgFile);

		return course.getCourseNo();
	}

	// 코스 삭제
	public void deleteCouseByNo(Long courseNo) {

		Course course = courseRepository.findById(courseNo).orElseThrow(EntityNotFoundException::new);

		courseRepository.deleteById(course.getCourseNo());
	}

	public Long saveCourse(CourseFormDto courseFormDto) throws Exception {

		Course course = courseFormDto.createCourse();

		courseRepository.save(course);

		return course.getCourseNo();
	}

	// 강의 상세보기
	@Transactional(readOnly = true)
	public CourseFormDto getCourseDtl(Long courseNo) {
		
		CourseImg courseImg = courseImgRepository.findByCourseCourseNo(courseNo);
		CourseImgDto coursImgDto = CourseImgDto.of(courseImg);
		
		Course course = courseRepository.findById(courseNo).orElseThrow(EntityNotFoundException::new);
		CourseFormDto courseFormDto = CourseFormDto.of(course);
		
		courseFormDto.setCourseImgDto(coursImgDto);

		return courseFormDto;
	}

	// 코스 업데이트
	public Long updateCourse(CourseFormDto courseFormDto, MultipartFile courseImgFile) throws Exception {

		Course course = courseRepository.findById(courseFormDto.getCourseNo())
				.orElseThrow(EntityNotFoundException::new);
		course.updateItem(courseFormDto);
		Long courseImgNo = courseFormDto.getCourseImgNo();
		
		courseImgService.updateCourseImg(courseImgNo, courseImgFile);

		return course.getCourseNo();
	}

	@Transactional(readOnly = true)
	public Page<Course> getAdminCoursePage(CourseSearchDto courseSearchDto, Pageable pageable) {
		return courseRepository.getAdminCoursePage(courseSearchDto, pageable);
	}// 관리자가 보는 아이템 페이지를 가져옵니다.
	

	@Transactional(readOnly = true)
	public Page<MainCourseDto> getMainItemPage(CourseSearchDto courseSearchDto, Pageable pageable) {
		return courseRepository.getMainItemPage(courseSearchDto, pageable);
	}

}
