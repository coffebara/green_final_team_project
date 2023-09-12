package com.itdaLearn.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.multipart.MultipartFile;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.constant.SellStatus;
import com.itdaLearn.dto.CourseFormDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.entity.CourseImg;
import com.itdaLearn.repository.CourseImgRepository;
import com.itdaLearn.repository.CourseRepository;

@SpringBootTest
@Transactional
@TestPropertySource(properties = { "spring.config.location = classpath:application-test.yml" })
public class CourseServiceTest {

   @Autowired
   CourseRepository courseRepository;
   @Autowired
   CourseService courseService;
   @Autowired
   CourseImgRepository courseImgRepository;

   List<MultipartFile> createMultipartFiles() throws Exception {
      
      List<MultipartFile> multipartFileList = new ArrayList<>();
      for (int i = 0; i < 5; i++) {
         String path = "C:/shop/item/";
         String imageName = "image"+ i + ".jpg";
         MockMultipartFile multipartFile = new MockMultipartFile(path, imageName, "image/jpg",
               new byte[] { 1, 2, 3, 4 });
         multipartFileList.add(multipartFile);
      }

      return multipartFileList;
   }
   
   CourseFormDto newCourseFormDto = createCourseFromDto("테스트 강의", "김상준", "테스트강의입니다1", "테스트강의입니다2", "테스트강의입니다3", 5000, CourseLevel.HIGH, CourseCategory.BE, SellStatus.SELL);

   
   @Test
   @DisplayName("강의 등록 테스트")
   @WithMockUser(username = "admin", roles = "ADMIN")
   void saveCourse() throws Exception {

      List<MultipartFile> courseImgFileList = createMultipartFiles();
      Long courseNo = courseService.saveCourse(newCourseFormDto, courseImgFileList);
      List<CourseImg>  courseImgList = courseImgRepository.findByCourseCourseNoOrderByCourseImgNo(courseNo);
      
      Course course = courseRepository.findById(courseNo).orElseThrow(EntityNotFoundException::new);

      assertEquals(newCourseFormDto.getCourseTitle(), course.getCourseTitle());
      assertEquals(newCourseFormDto.getCourseTeacher(), course.getCourseTeacher());
      assertEquals(newCourseFormDto.getCourseDec1(), course.getCourseDec1());
      assertEquals(newCourseFormDto.getCoursePrice(), course.getCoursePrice());
      assertEquals(newCourseFormDto.getCourseLevel(), course.getCourseLevel());
      assertEquals(newCourseFormDto.getCourseCategory(), course.getCourseCategory());
      assertEquals(courseImgFileList.get(0).getOriginalFilename(), courseImgList.get(0).getOriImgName());
   }
   
   @Test
   @DisplayName("강의 업데이트 테스트")
   @WithMockUser(username = "admin", roles = "ADMIN")
    void updateCourseTest() throws Exception {
      // given
      List<MultipartFile> courseImgFileList = createMultipartFiles();
      Long courseNo = courseService.saveCourse(newCourseFormDto, courseImgFileList);
      List<CourseImg>  courseImgList = courseImgRepository.findByCourseCourseNoOrderByCourseImgNo(courseNo);
      
      Course course = courseRepository.findById(courseNo).orElseThrow(EntityNotFoundException::new);
      List<Long> courseImgNos = new ArrayList<>();
      for(CourseImg courseImg: courseImgList) {
         courseImgNos.add(courseImg.getCourseImgNo()); 
      }
      
      // when
      CourseFormDto updateCourseFormDto = createCourseFromDto("업데이트 된 강의", "업데이트 된 김상준", "업데이트 된 테스트강의입니다1", "업데이트 된 테스트강의입니다2", "업데이트 된 테스트강의입니다3", 10000, CourseLevel.MID, CourseCategory.BE, SellStatus.SELL);
      updateCourseFormDto.setCourseFormDtoNo(courseNo);
      updateCourseFormDto.setCourseImgNos(courseImgNos);
      List<MultipartFile> updateCourseImgFileList = createMultipartFiles();

      
      Long updateCourseNo = courseService.updateCourse(updateCourseFormDto, updateCourseImgFileList);
      System.out.println(updateCourseNo);
      Course updateCourse = courseRepository.findById(updateCourseNo).orElseThrow(EntityNotFoundException::new);

      // then
      assertEquals(updateCourse.getCourseNo(), course.getCourseNo());
      assertEquals(updateCourse.getCourseTitle(), updateCourseFormDto.getCourseTitle()); // 변경된 타이틀 확인

   }
   
   
   @Test
   @DisplayName("강의 삭제 테스트")
   @WithMockUser(username = "admin", roles = "ADMIN")
   public void deleteCourseByNoTest() throws Exception {
      // given
      List<MultipartFile> courseImgFileList = createMultipartFiles();
      Long courseNo = courseService.saveCourse(newCourseFormDto, courseImgFileList);
      List<CourseImg>  courseImgList = courseImgRepository.findByCourseCourseNoOrderByCourseImgNo(courseNo);
      
      Course course = courseRepository.findById(courseNo).orElseThrow(EntityNotFoundException::new);
      
      // when
      course.deleteCourse();

      // then
      assertEquals(course.getSellStatus(), SellStatus.WAIT );  // 하드 딜리트가 아닌 소프트 딜리트로 판매 상태를 바꿈
   }


   public CourseFormDto createCourseFromDto(String title, String teacher, String dec1, String dec2, String dec3, Integer price, CourseLevel level,
         CourseCategory category, SellStatus sellStatus) {
      CourseFormDto newCourseFormDto = new CourseFormDto();
      newCourseFormDto.setCourseTitle(title);
      newCourseFormDto.setCourseTeacher(teacher);
      newCourseFormDto.setCoursePrice(price);
      newCourseFormDto.setCourseDec1(dec1);
      newCourseFormDto.setCourseDec2(dec2);
      newCourseFormDto.setCourseDec3(dec3);
      newCourseFormDto.setCourseCategory(category);
      newCourseFormDto.setCourseLevel(level);
      newCourseFormDto.setSellStatus(sellStatus);
      newCourseFormDto.setSellCount(0);

      return newCourseFormDto;
   }
}
