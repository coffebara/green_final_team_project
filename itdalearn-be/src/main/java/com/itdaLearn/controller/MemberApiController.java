package com.itdaLearn.controller;

import java.util.logging.Logger;

import com.itdaLearn.entity.Member;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
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

    private Logger logger =
            Logger.getLogger(MemberApiController.class.getName());
    private AuthenticationManager authenticationManager;

    @GetMapping("/")
    public String main(OAuth2AuthenticationToken token) { // Authentication 객체의 구현은 OAuth2AuthenticationToken 이다
        logger.info(String.valueOf(token.getPrincipal()));
        return "main.html";
    }

    // 테슽트용 컨트롤러
    @PostMapping("/user")
    @ResponseBody
    public String Member1(Authentication authentication) {
    	PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
    	System.out.println("authentication: " + principal.getUsername());
    	return "user";
    }


//    @PostMapping("/members")
//    public String members(AddMemberRequest request) {
//        memberService.save(request);
//        return "redirect:http://localhost:3000/members/login";
//    }

    @PostMapping("/members")
    public String members(AddMemberRequest memberRequest) {
        memberRequest.setRole("ROLE_ADMIN");
        // MemberRepository의 save() 메서드를 사용하여 회원 정보 저장
        memberService.save(memberRequest);

        return "redirect:http://localhost:3000/members/login";
    }

    //회원수정을 위한 비밀번호 재확인
    @PostMapping("/members/mypage/check")
    public ResponseEntity<String> checkPassword(
            @RequestBody MemberPasswordDto memberPasswordDto,
            PrincipalDetails principalDetails
    ) {
        try {
            if (principalDetails != null && principalDetails.getMember() != null) {
                String storedPassword = principalDetails.getMember().getMemberPwd();

                if (storedPassword.equals(memberPasswordDto.getMemberPwd())) {
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
    @PutMapping("/members/mypage/{id}")
    public String membersChange(@PathVariable String id, @RequestBody AddMemberRequest memberDto) {
        memberService.modify(memberDto);

        // Create an authentication token
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(memberDto.getMemberNo(), memberDto.getMemberPwd());

        // Authenticate the user
        Authentication authentication = this.authenticationManager.authenticate(authToken);

        // Update the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return "redirect:http://localhost:3000/members/mypage";
    }



    @GetMapping("info")
    public @ResponseBody String info() {
        return "개인정보";
    }
}