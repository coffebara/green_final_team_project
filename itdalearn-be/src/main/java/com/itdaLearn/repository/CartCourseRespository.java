package com.itdaLearn.repository;


import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.itdaLearn.dto.CartDetailDto;
import com.itdaLearn.entity.CartCourse;



public interface CartCourseRespository extends JpaRepository<CartCourse, Long>{
	
	CartCourse findByCartCartNoAndCourseCourseNo( long cartNo, long courseNo);
		
	   @Query("select new com.itdaLearn.dto.CartDetailDto(ci.cartCourseNo, i.courseTitle, i.coursePrice)" +		
			       "from CartCourse ci " +
			          "join ci.course i " +
			          "where ci.cart.cartNo = :cartNo")
	List<CartDetailDto> findCartDetailDtoList(@Param("cartNo")Long cartNo);

}


