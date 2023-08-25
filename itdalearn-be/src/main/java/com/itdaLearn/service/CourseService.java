package com.itdaLearn.service;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.dto.CourseSearchDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.repository.CourseRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {

	private final CourseRepository courseRepository;

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
	public CourseFormDto getCourseDtl(Long course_no) {

		Course course = courseRepository.findById(course_no).orElseThrow(EntityNotFoundException::new);

		CourseFormDto courseFormDto = CourseFormDto.of(course);

		return courseFormDto;
	}

	// 코스 업데이트
	public Long updateCourse(CourseFormDto courseFormDto) throws Exception {

		Course course = courseRepository.findById(courseFormDto.getCourseNo())
				.orElseThrow(EntityNotFoundException::new);
		course.updateItem(courseFormDto);

		return course.getCourseNo();
	}
	
	@Transactional(readOnly = true)
	public Page<Course> getAdminCoursePage(CourseSearchDto courseSearchDto, Pageable pageable){
		return courseRepository.getAdminCoursePage(courseSearchDto, pageable);
	}//관리자가 보는 아이템 페이지를 가져옵니다.
	
}
