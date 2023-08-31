package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class OrderCourse {
	
	@Id @GeneratedValue
    @Column(name = "order_course_no")
    private Long orderCourseNo;

	
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_no")
    private Course course;
    
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_no")
    private Order order;

    private int orderPrice; //주문가격
    
    public static OrderCourse createOrderCourse(Course course) {
    	 	
    	OrderCourse orderCourse = new OrderCourse();
    	orderCourse.setCourse(course);
    	orderCourse.setOrderPrice(course.getCoursePrice());

    	return orderCourse;
  }
   
   public int getTotalPrice() {
	   return orderPrice;
   }

}
