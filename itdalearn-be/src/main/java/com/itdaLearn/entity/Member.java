package com.itdaLearn.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
@Entity
public class Member implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_id", updatable = false)
    private Long id;

    @Column(name = "member_no", nullable = false, unique = true)
    private String memberNo;

    private String memberPwd;

    private String memberName; //유저이름

    @Column(unique = true, nullable = false, name="member_email")
    private String memberEmail; //이메일 로그인할 때 입력값

    private String role;

    private String memberTel;

    @Builder
    public Member(String memberNo, String memberPwd, String memberName, String memberEmail, String role, String memberTel, String auth) {
        this.memberNo = memberNo;
        this.memberPwd = memberPwd;
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.role = role;
        this.memberTel = memberTel;
    }

    public List<String> getRoleList() {
        if (this.role.length() > 0) {
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(new SimpleGrantedAuthority("user"));
	}

	@Override
	public String getPassword() {
	
		return memberPwd;
	}

	@Override
	public String getUsername() {
		
		return memberNo;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
