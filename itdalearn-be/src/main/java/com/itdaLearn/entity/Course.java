package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.dto.CourseFormDto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Course {
	@SequenceGenerator(name = "ITEM_SEQUENCE_GEN", sequenceName = "seq_item", initialValue = 1, allocationSize = 1) 																												
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ITEM_SEQUENCE_GEN")
	@Id
	@Column(name="course_no")
	private Long courseNo;
	
	@Column(nullable = false, name = "course_title")
	private String courseTitle;
	
	@Column(nullable = false, name = "course_teacher")
	private String courseTeacher;
	
	@Column(nullable = false, name = "course_price")
	private Integer coursePrice;
	
	@Column(nullable = false, name = "course_dec")
	private String courseDec;

	@Enumerated(EnumType.STRING)
	private CourseLevel courseLevel;
	
	@Enumerated(EnumType.STRING)
	private CourseCategory courseCategory;

	public void updateItem(CourseFormDto courseFormDto) {
    	this.courseTitle = courseFormDto.getCourseTitle();
    	this.courseTeacher = courseFormDto.getCourseTeacher();
    	this.courseDec = courseFormDto.getCourseDec();
    	this.courseLevel = courseFormDto.getCourseLevel();
    	this.courseCategory = courseFormDto.getCourseCategory();
    	this.coursePrice = courseFormDto.getCoursePrice();

    }
}
