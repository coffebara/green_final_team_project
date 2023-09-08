package com.itdaLearn.service;

import com.itdaLearn.dto.AddMemberRequest;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddMemberRequest dto) {
        String password = dto.getMemberPwd();
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("======================================");
        }
        return memberRepository.save(Member.builder()
                .memberNo(dto.getMemberNo())
                .memberPwd(bCryptPasswordEncoder.encode(dto.getMemberPwd())) // 1234ppp -> ABC33333
                .memberName(dto.getMemberName())
                .memberEmail(dto.getMemberEmail())
                .role(dto.getRole())
                .memberTel(dto.getMemberTel())
                .build()).getId();
    }
    
    public Member findById(Long userId) {
    	return memberRepository.findById(userId)
    			.orElseThrow( () -> new IllegalArgumentException("Unexpected user"));
    }
}














//package com.itdaLearn.service;
//
//import javax.transaction.Transactional;
//
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.itdaLearn.entity.Member;
//import com.itdaLearn.repository.MemberRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class MemberService implements UserDetailsService {
//
//    private final MemberRepository memberRepository;
//
//    public Member saveMember(Member member){
//        validateDuplicateMember(member);
//        return memberRepository.save(member);
//    }
//
//    private void validateDuplicateMember(Member member){
//        Member findMember = memberRepository.findByEmail(member.getEmail());
//        if(findMember != null){
//            throw new IllegalStateException("이미 가입된 회원입니다.");
//        }
//    }
//        @Override
//        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//
//            Member member = memberRepository.findByEmail(email);
//
//            if(member == null){
//                throw new UsernameNotFoundException(email);
//            }
//
//            return User.builder()
//                    .username(member.getEmail())
//                    .password(member.getPassword())              
//                    .build();
//        }
//
//    }