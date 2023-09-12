package com.itdaLearn.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import com.itdaLearn.dto.MemberFormDto;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.MemberRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import javax.persistence.EntityNotFoundException;

@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    MemberRepository memberRepository;

    public MemberFormDto createMember(){
        MemberFormDto memberFormDto = new MemberFormDto(); 
        memberFormDto.setMemberNo("user");
        memberFormDto.setMemberName("권혜연");
        memberFormDto.setMemberEmail("test@tester.com");
        memberFormDto.setMemberPwd("12345678");
        memberFormDto.setMemberTel("010-111-1111");
        memberFormDto.setRole("ROLE_USER");
        memberFormDto.setId(1L);
        
        
        return memberFormDto;
        		
    }

    @Test
    @DisplayName("회원가입 테스트")
    public void saveMemberTest(){
    	MemberFormDto newMember = createMember();
        Long savedMemberNo = memberService.save(newMember); //회원 savedMember
        
        Member member = memberRepository.findById(savedMemberNo)
        		.orElseThrow(EntityNotFoundException::new);
        
        assertEquals(newMember.getMemberEmail(), member.getMemberEmail());
        assertEquals(newMember.getMemberName(), member.getMemberName());
    
    }   

}