package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import com.itdaLearn.dto.MemberFormDto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="member")
@Getter @Setter
@ToString
public class Member {
	
	@Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
   
    public static Member createMember(MemberFormDto memberFormDto, String password){
    	
        Member member = new Member();
        member.setName(memberFormDto.getName());
        member.setEmail(memberFormDto.getEmail());
     
        //String password = passwordEncoder.encode(memberFormDto.getPassword());
       
        member.setPassword(password);
       
        return member;
    }

}
