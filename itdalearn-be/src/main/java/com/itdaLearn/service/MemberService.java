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


        member.setMemberNo(memberDto.getMemberNo()); // 새 회원 번호 설정
        member.setMemberPwd(bCryptPasswordEncoder.encode(memberDto.getMemberPwd()));
        member.setMemberName(memberDto.getMemberName()); // 새 이름 설정
        member.setMemberEmail(memberDto.getMemberEmail()); // 이메일이 제공된 경우, 새 이메일 설정
        member.setMemberTel(memberDto.getMemberTel());

        return member;
    }

}




