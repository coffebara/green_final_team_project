//package com.itdaLearn.service;
//
//import com.itdaLearn.dto.AddMemberRequest;
//import com.itdaLearn.entity.Member;
//import com.itdaLearn.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//
//@RequiredArgsConstructor
//@Service
//public class MemberService {
//    private final MemberRepository memberRepository;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    public Long save(AddMemberRequest dto) {
//        String password = dto.getMemberPwd();
//        if (password == null || password.isEmpty()) {
//            throw new IllegalArgumentException("비밀번호가 입력되지 않았습니다.");
//        }
//        String memberNo = dto.getMemberNo();
//        if (memberNo == null || memberNo.isEmpty()) {
//            throw new IllegalArgumentException("회원 번호가 입력되지 않았습니다.");
//        }
//        return memberRepository.save(Member.builder()
//                .memberNo(dto.getMemberNo())
//                .memberPwd(bCryptPasswordEncoder.encode(dto.getMemberPwd())) // 1234ppp -> ABC33333
//                .memberName(dto.getMemberName())
//                .memberEmail(dto.getMemberEmail())
//                .role(dto.getRole())
//                .memberTel(dto.getMemberTel())
//                .build()).getId();
//    }
//
////    @Transactional
////    public void modify(AddMemberRequest memberDto) {
////        Member member = memberRepository.findByMemberNo(memberDto.AddMemberRequest().getMemberNo()).orElseThrow(() ->
////             new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
////
////     String encPassword = bCryptPasswordEncoder.encode(memberDto.getMemberPwd());
////
////        member.modify(memberDto.getMemberNo(), encPassword, memberDto.getMemberEmail(),
////                memberDto.getMemberName(), memberDto.getMemberTel());
////}
//    @Transactional
//    public void modify(AddMemberRequest memberDto) {
//        Member member = memberRepository.findByMemberNo(memberDto.getMemberNo());
//
//        if (member == null) {
//            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
//        }
//
//        String encPassword = bCryptPasswordEncoder.encode(memberDto.getMemberPwd());
//        member.modify(memberDto.getMemberNo(), encPassword, memberDto.getMemberEmail(),
//                memberDto.getMemberName(), memberDto.getMemberTel());
//    }
//
//
////    public Member findById(Long userId) {
////    	return memberRepository.findById(userId)
////    			.orElseThrow( () -> new IllegalArgumentException("Unexpected user"));
////    }
//
//}

package com.itdaLearn.service;

import com.itdaLearn.dto.AddMemberRequest;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddMemberRequest dto) {

        String password = dto.getMemberPwd();
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("비밀번호가 입력되지 않았습니다.");
        }
        String memberNo = dto.getMemberNo();
        if (memberNo == null || memberNo.isEmpty()) {
            throw new IllegalArgumentException("회원 번호가 입력되지 않았습니다.");
        }
        dto.setRole("ROLE_USER");
        return memberRepository.save(Member.builder()
                .memberNo(dto.getMemberNo())
                .memberPwd(bCryptPasswordEncoder.encode(dto.getMemberPwd())) // 1234ppp -> ABC33333
                .memberName(dto.getMemberName())
                .memberEmail(dto.getMemberEmail())
                .role(dto.getRole())
                .memberTel(dto.getMemberTel())
                .build()).getId();

    }


//    @Transactional
//    public void modify(AddMemberRequest memberDto) {
//        Member member = memberRepository.findByMemberNo(memberDto.AddMemberRequest().getMemberNo()).orElseThrow(() ->
//             new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
//
//     String encPassword = bCryptPasswordEncoder.encode(memberDto.getMemberPwd());
//
//        member.modify(memberDto.getMemberNo(), encPassword, memberDto.getMemberEmail(),
//                memberDto.getMemberName(), memberDto.getMemberTel());
//}

    @Transactional
    public Member modify(Long id, AddMemberRequest memberDto) {
        Optional<Member> optionalMember = memberRepository.findById(id);

        if (!optionalMember.isPresent()) {
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }

        Member member = optionalMember.get();

        String encPassword = bCryptPasswordEncoder.encode(memberDto.getMemberPwd()); // 새 비밀번호 암호화

        member.setMemberNo(memberDto.getMemberNo()); // 새 회원 번호 설정
        member.setMemberPwd(encPassword); // 암호화된 비밀번호 설정
        member.setMemberName(memberDto.getMemberName()); // 새 이름 설정

        if (memberDto.getMemberEmail() != null && !memberDto.getMemberEmail().isEmpty()) {
            member.setMemberEmail(memberDto.getMemberEmail()); // 이메일이 제공된 경우, 새 이메일 설정
        }
        member.setMemberTel(memberDto.getMemberTel());

        return member;
    }


//    @Transactional
//    public Member modify(Long id, AddMemberRequest memberDto) {
//        Optional<Member> optionalMember = memberRepository.findById(memberDto.getId());
//
//        if (!optionalMember.isPresent()) {
//            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
//        }
//
//        Member member = optionalMember.get();
//
////        String encPassword = bCryptPasswordEncoder.encode(memberDto.getMemberPwd());
//        String encPassword = bCryptPasswordEncoder.encode(member.getMemberPwd());
//
////        member.setMemberNo(memberDto.getMemberNo());
//        member.setMemberNo(member.getMemberNo());
//        member.setMemberPwd(encPassword);
////        member.setMemberName(memberDto.getMemberName());
//        member.setMemberName(member.getMemberName());
//        if (memberDto.getMemberEmail() != null && !memberDto.getMemberEmail().isEmpty()) {
////            member.setMemberEmail(memberDto.getMemberEmail());
//            member.setMemberEmail(member.getMemberEmail());
//        }
//
////        member.setMemberTel(memberDto.getMemberTel());
//        member.setMemberTel(member.getMemberTel());
//
//        return member;
//    }



}




