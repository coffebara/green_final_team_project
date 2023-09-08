package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.itdaLearn.constant.CourseCategory;
import com.itdaLearn.constant.CourseLevel;
import com.itdaLearn.constant.SellStatus;
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
	private Long courseNo;
	
	@Column(nullable = false)
	private String courseTitle;
	
	@Column(nullable = false)
	private String courseTeacher;
	
	@Column(nullable = false)
	private Integer coursePrice;

	@Column(nullable = false, length = 1000)
	private String courseDec1;
	
	@Column(nullable = false, length = 1000)
	private String courseDec2;
	
	@Column(nullable = false, length = 1000)
	private String courseDec3;
	
	@ColumnDefault("0")
	private Integer sellCount;
	
	@Enumerated(EnumType.STRING)
	private CourseLevel courseLevel;
	
	@Enumerated(EnumType.STRING)
	private CourseCategory courseCategory;
	
	@Enumerated(EnumType.STRING)
	private SellStatus sellStatus;

	public void updateCourse(CourseFormDto courseFormDto) {
    	this.courseTitle = courseFormDto.getCourseTitle();
    	this.coursePrice = courseFormDto.getCoursePrice();
    	this.courseTeacher = courseFormDto.getCourseTeacher();
    	this.courseDec1 = courseFormDto.getCourseDec1();
    	this.courseDec2 = courseFormDto.getCourseDec2();
    	this.courseDec3 = courseFormDto.getCourseDec3();
    	this.sellStatus = courseFormDto.getSellStatus();
    	this.courseLevel = courseFormDto.getCourseLevel();
    	this.courseCategory = courseFormDto.getCourseCategory();
    }
	
	public void deleteCourse() {
		this.sellStatus = SellStatus.WAIT;
	}
	
	public void decreaseSellCount(int sellCount) {
    	--this.sellCount;
    }
	
    public void addSellCount(int sellCount) {
    	++this.sellCount;
    }
}
