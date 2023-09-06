package com.itdaLearn.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import com.itdaLearn.dto.CourseSearchDto;
import com.itdaLearn.dto.MainCourseDto;
import com.itdaLearn.dto.QMainCourseDto;
import com.itdaLearn.entity.Course;
import com.itdaLearn.entity.QCourse;
import com.itdaLearn.entity.QCourseImg;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;


public class CourseRepositoryCustomImpl implements CourseRepositoryCustom {
	
	private JPAQueryFactory queryFactory;

	public CourseRepositoryCustomImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	private BooleanExpression searchByLike(String searchBy, String searchQuery) {
// searchBy의 값에 따라서 상품명에 검색어를 포함하고 있는 상품 또는
// 상품 생성자의 아이디에 검색어를 포함하고 있는 상품을 조회하도록 조건값을 반환합니다.
		if(searchBy.equals("courseTitle")) {
			return QCourse.course.courseTitle.like("%" + searchQuery + "%");
		}
			else if("courseTeacher".equals(searchBy)) {
			return QCourse.course.courseTeacher.like("%" + searchQuery + "%");
		}
		return null;
	}

	@Override
	public Page<Course> getAdminCoursePage(CourseSearchDto courseSearchDto, Pageable pageable) {
		// queryFactory를 이용해서 쿼리를 생성
		QueryResults<Course> results = queryFactory
				.selectFrom(QCourse.course)//상품 데이터를 조회하기 위해서 QItem의 item을 지정
				.where(searchByLike(courseSearchDto.getSearchBy(),
								courseSearchDto.getSearchQuery()))
				.orderBy(QCourse.course.courseNo.desc())
				.offset(pageable.getOffset())//데이터를 가지고 올 시작 인덱스를 지정
				.limit(pageable.getPageSize())//한 번에 가지고 올 최대 개수를 지정
				.fetchResults();
		
		List<Course> content = results.getResults();
		long total = results.getTotal();
		
		return new PageImpl<>(content, pageable, total);
	}//조회한 데이터를 Page 클래스의 구현체인 PageImpl 객체로 반환합니다.


	
	  private BooleanExpression CourseTitleLike(String searchQuery) {
		//검색어가 null 아니면 상품명에 해당 검색어가 포함되는 상품을 조회하는 조건을 반환합니다. 
		  
		     
		      return StringUtils.isEmpty(searchQuery) ? null : QCourse.course.courseTitle.like("%" + searchQuery + "%");
		    	
		   }

	@Override	
	public Page<MainCourseDto> getMainItemPage(CourseSearchDto courseSearchDto, Pageable pageable) {
		QCourse course = QCourse.course;
		QCourseImg courseImg = QCourseImg.courseImg;
		
		QueryResults<MainCourseDto> results = queryFactory
				.select(new QMainCourseDto(
						course.courseNo,
						course.courseTitle,
						course.courseDec1,
						courseImg.imgUrl,
						course.coursePrice,
						course.courseTeacher,
						course.courseCategory,
						course.courseLevel)
						)
				.from(courseImg)
				.join(courseImg.course, course)
				.where(searchByLike(courseSearchDto.getSearchBy(),
						courseSearchDto.getSearchQuery()))
				.orderBy(QCourse.course.courseNo.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetchResults();
		      
		      List<MainCourseDto> content = results.getResults();
		      long total = results.getTotal();
		      
		      return new PageImpl<>(content,pageable,total);
		
	}
	
	private BooleanExpression courseTitleLike(String searchQuery) {
//검색어가 null 아니면 상품명에 해당 검색어가 포함되는 상품을 조회하는 조건을 반환합니다.		
		return searchQuery.isEmpty() ? null : QCourse.course.courseTitle.like("%" + searchQuery + "%");
	}

	


}

