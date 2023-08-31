package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Entity
@Table(name="member")
@Getter @Setter
@ToString
public class Member {
	
	@Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; //디비 자동생성

	@Column(name = "member_no", unique = true)
	private String memberNo;
	
    private String memberName; //유저이름

    @Column(unique = true)
    private String email; //이메일 로그인할 때 입력값

    @Column(name = "activated")
    private boolean activated;
    
    private String memberPwd;
    
    private String role; 
    
    private String memberTel;

//    @CreationTimestamp
//    private Timestamp createDate;
    
//    public static Member createMember(MemberFormDto memberFormDto, String password){
//    	
//        Member member = new Member();
//        member.setUsername(memberFormDto.getUsername());
//        member.setEmail(memberFormDto.getEmail());
//     
//        //String password = passwordEncoder.encode(memberFormDto.getPassword());
//       
//        member.setPassword(password);
//       
//        return member;
//    }

}
