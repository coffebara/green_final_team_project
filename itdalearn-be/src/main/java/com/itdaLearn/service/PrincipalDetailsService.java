package com.itdaLearn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.itdaLearn.config.PrincipalDetails;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.MemberRepository;


@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberNo) throws UsernameNotFoundException {
        Member memberEntity = memberRepository.findByMemberNo(memberNo);
        if (memberEntity != null) { // null이 아니면 회원이라는 뜻이기 때문에
            return new PrincipalDetails(memberEntity);
        }
        return null;
    }
}