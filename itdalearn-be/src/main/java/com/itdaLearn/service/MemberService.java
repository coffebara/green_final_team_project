package com.itdaLearn.service;

import com.itdaLearn.dto.MemberFormDto;
import com.itdaLearn.entity.Member;
import com.itdaLearn.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(MemberFormDto dto) {

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

    @Transactional
    public Member modify(Long id, MemberFormDto memberDto) {
        Optional<Member> optionalMember = memberRepository.findById(id);

        if (!optionalMember.isPresent()) {
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }

        Member member = optionalMember.get();

        if (memberDto.getMemberNo() != null && !memberDto.getMemberNo().isEmpty()) {
            member.setMemberNo(memberDto.getMemberNo());
        }
        if (memberDto.getMemberPwd() != null && !memberDto.getMemberPwd().isEmpty()) {
            member.setMemberPwd(memberDto.getMemberPwd());
//            member.setMemberPwd(bCryptPasswordEncoder.encode(memberDto.getMemberPwd()));
        }
        if (memberDto.getMemberName() != null && !memberDto.getMemberName().isEmpty()) {
            member.setMemberName(memberDto.getMemberName());
        }
        if (memberDto.getMemberEmail() != null && !memberDto.getMemberEmail().isEmpty()) {
            member.setMemberEmail(memberDto.getMemberEmail());
        }
        if (memberDto.getMemberTel() != null && !memberDto.getMemberTel().isEmpty()) {
            member.setMemberTel(member.getMemberTel());
        }

        return member;
    }

}




