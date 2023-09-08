//package com.itdaLearn.controller;
//
//import javax.validation.Valid;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.itdaLearn.dto.MemberFormDto;
//import com.itdaLearn.entity.Member;
//import com.itdaLearn.service.MemberService;
//
//import lombok.RequiredArgsConstructor;
//@CrossOrigin(origins = "localhost:3000")
//@RequestMapping("/members")
//@RestController
//@RequiredArgsConstructor
//public class MemberController {
//
//    private final MemberService memberService;
//    //private final PasswordEncoder passwordEncoder;
//
//    @GetMapping(value = "/new")
//    public String memberForm(Model model){
//
//        model.addAttribute("memberFormDto", new MemberFormDto());
//        return "member/memberForm";
//    }
//
//    @PostMapping(value = "/new")
//    public String newMember(@Valid MemberFormDto memberFormDto, BindingResult bindingResult, Model model){
//    	String password = "12345678";
//        if(bindingResult.hasErrors()){
//            return "member/memberForm";
//        }
//
//        try {
//            Member member = Member.createMember(memberFormDto, password);
//
//            memberService.saveMember(member);
//        } catch (IllegalStateException e){
//            model.addAttribute("errorMessage", e.getMessage());
//            return "member/memberForm";
//        }
//
//        return "redirect:/";
//    }
//
//    @GetMapping(value = "/login")
//    public String loginMember(){
//
//        return "/member/memberLoginForm";
//    }
//
//    @GetMapping(value = "/login/error")
//    public String loginError(Model model){
//        model.addAttribute("loginErrorMsg", "아이디 또는 비밀번호를 확인해주세요");
//        return "/member/memberLoginForm";
//    }
//
//}

