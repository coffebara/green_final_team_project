package com.itdaLearn.config;

import com.itdaLearn.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

// Security Session => Authentication => UserDetails(PrincipalDetails) 아래와 같이 implements UserModelDetails 을 하면
// UserDetails를 꺼내올 수 있다
public class PrincipalDetails implements UserDetails {

    private Member member; // 콤포지션
    public PrincipalDetails(Member member) {
        this.member = member;
    }

    // 해당 User의 권한을 리턴하는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        userModel.getRole(); // 타입을 String으로 정해놓았기 때문에 얘를 리턴할 수 없다
        Collection<GrantedAuthority> collect = new ArrayList<>();
//        collect.add(new GrantedAuthority() {
//            @Override
//            public String getAuthority() {
//                return member.getRole();
//            }
//        });
        return collect;
    }

    @Override
    public String getPassword() {
        return member.getMemberPwd();
    }

    @Override
    public String getUsername() {
        return member.getMemberNo();
    }

    @Override
    public boolean isAccountNonExpired() { // 너의 계정 만료되었니
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { // 너의 계정 잠겻니
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { // 너의 계정의 비밀번호가 오래되었니
        return true;
    }

    @Override
    public boolean isEnabled() { // 너의 계정이 비활성화 되어있니

        // 우리 사이트!! 1년 동안 회원이 로그인을 안하면!! 휴먼 계정으로 하기로 함. 따로 하는게 있음
        return true;
    }
}