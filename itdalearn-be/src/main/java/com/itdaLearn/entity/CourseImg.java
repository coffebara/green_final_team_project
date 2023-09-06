package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

import lombok.ToString;


@Entity
@Table(name = "course_img")
@Getter
@Setter
@ToString
public class CourseImg {

	@SequenceGenerator(name = "ITEM_SEQUENCE_GEN", sequenceName = "seq_item", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ITEM_SEQUENCE_GEN")
	@Id
	@Column(name="course_img_no")
	private Long courseImgNo;
	private String imgName;
	private String oriImgName;
	private String imgUrl;
	private String repimgYn;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "course_no")
	private Course course;
	
	public void updateCourseImg(String oriImgName, String imgName, String imgUrl) {
		this.oriImgName = oriImgName;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
	}
}
