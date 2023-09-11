package com.itdaLearn.controller;

import java.util.logging.Logger;

import com.itdaLearn.config.jwt.JwtAuthenticationFilter;
import com.itdaLearn.entity.Member;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.itdaLearn.dto.AddMemberRequest;
import com.itdaLearn.repository.MemberRepository;
import com.itdaLearn.service.MemberService;
import com.itdaLearn.service.PrincipalDetails;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Controller
public class MemberApiController {

    @Autowired
    private final MemberService memberService;
    private MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/members")
//    public String members(@Valid AddMemberRequest memberRequest) {
    public String members(AddMemberRequest memberRequest) {
        memberService.save(memberRequest);

        return "redirect:http://localhost:3000/members/login";
    }

    //회원수정을 위한 비밀번호 재확인
    @PostMapping("/members/mypage/check")
    public ResponseEntity<String> checkPassword(
            @RequestBody MemberPasswordDto memberPasswordDto,
            Authentication authentication) {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        try {
            System.out.println("저장된 패스워드: " + memberPasswordDto.getMemberPwd());
            System.out.println("원래 패스워드: " + principalDetails.getMember().getMemberPwd());
            if (principalDetails != null && principalDetails.getMember() != null) {
                String storedPassword = principalDetails.getMember().getMemberPwd();

                if (bCryptPasswordEncoder.matches(memberPasswordDto.getMemberPwd(), storedPassword)) {
                    System.out.println("저장된 패스워드: " + memberPasswordDto.getMemberPwd());
                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Data
    public static class MemberPasswordDto {
        private String memberPwd;
    }

    @ResponseBody
    @GetMapping("/members/mypage")
    public PrincipalDetails member(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return principalDetails;
    }

    @PatchMapping("/members/mypage/{id}")
    public String membersChange(Authentication authentication,
                                @PathVariable Long id,
                                @RequestBody AddMemberRequest memberDto) {

        Member member = memberService.modify(id, memberDto);
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        principalDetails.setMember(member);

        return "redirect:http://localhost:3000/";
    }


}