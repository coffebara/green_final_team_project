package com.itdaLearn.service;


import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// http://localhost:9090/login
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberNo) throws UsernameNotFoundException {
    	System.out.println("memberNo: " +memberNo);
        System.out.println("PrincipalDetialsService의 loadUserByUsername()");
        Member member = memberRepository.findByMemberNo(memberNo);
        System.out.println("member = " + member);
        return new PrincipalDetails(member);
    }
    
    

}