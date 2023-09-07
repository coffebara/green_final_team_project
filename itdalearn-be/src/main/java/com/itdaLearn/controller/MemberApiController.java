package com.itdaLearn.controller;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @PostMapping("members")
    public String members(AddMemberRequest memberRequest) {
        memberRequest.setRole("ROLE_ADMIN");
        // MemberRepository의 save() 메서드를 사용하여 회원 정보 저장
        memberService.save(memberRequest);

        return "redirect:http://localhost:3000/members/login";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:http://localhost:3000/";
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("info")
    public @ResponseBody String info() {
        return "개인정보";
    }
}