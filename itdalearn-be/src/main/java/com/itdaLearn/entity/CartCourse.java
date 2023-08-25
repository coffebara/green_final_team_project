package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter @Setter
@Table(name="cart_course")
public class CartCourse {

		@Id
	    @GeneratedValue
	    @Column(name = "cart_course_no")
	    private Long cartCourseNo;
  
	    @ManyToOne(fetch = FetchType.LAZY)   
	    @JoinColumn(name="cart_no")
	    private Cart cart;
	
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "course_no")
	    private Course course;
	    
	    public static CartCourse createCartCourse(Cart cart, Course course) {
	    	CartCourse cartCourse = new CartCourse();
	    	cartCourse.setCart(cart);
	    	cartCourse.setCourse(course);
	    	return cartCourse;
	    	
	    }

}
