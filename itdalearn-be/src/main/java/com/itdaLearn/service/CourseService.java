package com.itdaLearn.service;

import java.util.ArrayList;
import java.util.List;

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
	public Long saveCourse(CourseFormDto courseFormDto, List<MultipartFile> courseImgFileList) throws Exception {

		Course course = courseFormDto.createCourse();
		System.out.println(course);
		courseRepository.save(course);

		for (int i = 0; i < courseImgFileList.size(); i++) {
			CourseImg courseImg = new CourseImg();
			courseImg.setCourse(course);
			
			if (i == 0) {
				courseImg.setRepimgYn("Y");
			} else {
				courseImg.setRepimgYn("N");
			}
		courseImgService.saveCourseImg(courseImg, courseImgFileList.get(i));
		}

		return course.getCourseNo();
	}

	// 코스 삭제
	public void deleteCouseByNo(Long courseNo) {

//		Course course = courseRepository.findById(courseNo).orElseThrow(EntityNotFoundException::new);
//		CourseImg courseImg = courseImgRepository.findByCourseCourseNo(courseNo);
		
//		courseImgRepository.delete(courseImg);s
//		courseRepository.deleteById(course.getCourseNo());
	}

	// 강의 상세보기
	@Transactional(readOnly = true)
	public CourseFormDto getCourseDtl(Long courseNo) {
		
		List<CourseImg> courseImgList = courseImgRepository.findByCourseCourseNoOrderByCourseImgNo(courseNo);
		List<CourseImgDto> courseImgDtoList = new ArrayList<>();
		for (CourseImg courseImg : courseImgList) {
			// 조회한 ItemImg 엔티티를 ItemImgDto 객체로 만들어서 리스트에 추가
						CourseImgDto courseImgDto = CourseImgDto.of(courseImg);
						courseImgDtoList.add(courseImgDto);
		}
		Course course = courseRepository.findById(courseNo).orElseThrow(EntityNotFoundException::new);
		CourseFormDto courseFormDto = CourseFormDto.of(course);
		courseFormDto.setCourseImgDtoList(courseImgDtoList);

		return courseFormDto;
	}

	// 코스 업데이트
	public Long updateCourse(CourseFormDto courseFormDto, List<MultipartFile> courseImgFileList) throws Exception {

		
		Course course = courseRepository.findById(courseFormDto.getCourseFormDtoNo())
				.orElseThrow(EntityNotFoundException::new);
		course.updateItem(courseFormDto);
		List<Long> courseImgNos = courseFormDto.getCourseImgNos();

		for (int i = 0; i < courseImgFileList.size(); i++) {
			courseImgService.updateCourseImg(courseImgNos.get(i), courseImgFileList.get(i));
		}
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
