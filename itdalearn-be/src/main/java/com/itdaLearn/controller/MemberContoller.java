//package com.itdaLearn.controller;
//
//import java.security.Principal;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.itdaLearn.entity.Member;
//import com.itdaLearn.repository.MemberRepository;
//
//
//@Controller 
//public class MemberContoller {
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @GetMapping("/user")
//    public @ResponseBody String user() {
//        return "user";
//    }
//
//    @GetMapping("/admin")
//    public @ResponseBody String admin() {
//        return "admin";
//    }
//
//    @GetMapping("/manager")
//    public @ResponseBody String manager() {
//        return "manager";
//    }
//
//    @PostMapping("/members")
//    public String members(Member member) {
//        System.out.println(member);
//        member.setRole("ROLE_USER");
//        String rawPassword = member.getMemberPwd();
//        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//        member.setMemberPwd(encPassword);
//        memberRepository.save(member); // 회원가입이 잘되지만 이 한 줄로 이렇게 하면 안됨 비밀번호: 1234 => 시큐리티로
//        // 로그인을 할 수 없음 이유는 패스워드가 암호화가 안되었기 때문!
//        System.out.println(member);
//        return "redirect:http://localhost:3000/members/login"; // 리액트 개발 서버 URL 이렇게 안하고 redirect만 하면 localhost:9090/signin으로 감
//
//    }
//}