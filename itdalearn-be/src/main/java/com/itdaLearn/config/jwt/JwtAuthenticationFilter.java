package com.itdaLearn.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itdaLearn.entity.Member;
import com.itdaLearn.service.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        System.out.println("로그인 시도중");

        try {
            // ObjectMapper를 사용하여 HTTP 요청의 본문(JSON)을 Member 객체로 변환합니다.
            ObjectMapper om = new ObjectMapper();
            Member member = om.readValue(request.getInputStream(), Member.class);
            System.out.println("member = " + member);

            // 이를 생성하기 위해 사용자가 입력한 아이디와 비밀번호를 사용합니다.
            UsernamePasswordAuthenticationToken authenticationToken = // UsernamePasswordAuthenticationToken은 인증 요청을 나타내는 객체입니다.
                    new UsernamePasswordAuthenticationToken(member.getMemberNo(), member.getMemberPwd());

            // AuthenticationManager에게 인증 요청 토큰을 전달하여 인증을 시도합니다.
            // 이때 loadUserByUsername 메소드가 호출되며, 해당 메소드에서는 DB 등에서 사용자 정보를 조회하고,
            // 입력된 비밀번호와 저장된 비밀번호가 일치하는지 확인합니다.
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // 인증이 성공하면 UserDetails 타입의 객체(여기서는 PrincipalDetails)를 반환받습니다.
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            System.out.println("로그인 완료됨" + principalDetails.getMember().getMemberNo());

            // 마지막으로, 인증 정보(Authentication)를 세션에 저장하고 반환합니다.
            return authentication;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);  // 추가: 예외 발생시 런타임 예외로 감싸서 던져주기
        }
    }

    // 전체적인 순서
    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행된다
    // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT 토큰을 response 해주면 된다
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨:인증이 완료되었다는 뜻임");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String accessToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME)) //토큰 만료시간 System.currentTimeMillis은 현재시간 뒤에는 1분 * 10 = 10분 토큰 만료시간은 10분
                .withClaim("id", principalDetails.getMember().getId())
                .withClaim("username", principalDetails.getMember().getMemberNo()) // 비공개 클레임 마음대로 해도됨
                .withArrayClaim("role", principalDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                        .toArray(String[]::new))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+accessToken); // Bearer은 무조건 한 칸 띄어야 함
    }
}