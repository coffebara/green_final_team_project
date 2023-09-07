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

    // /login 요청을 하면 로그인시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        System.out.println("로그인 시도중");

        // 1. memberNo, memberPwd 받아서
        try {
            ObjectMapper om = new ObjectMapper(); //json 데이터를 파싱함 username password 데이터 등
            Member member = om.readValue(request.getInputStream(), Member.class);
            System.out.println("member = " + member); // 로그인할 때 username하고 password 받아옴

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(member.getMemberNo(), member.getMemberPwd()); //스프링이 알아서 처리해주기 때문에 자세하게 알필요 없다

            // principalDetailsService의 loadUserByUsername() 함수가 실행된 후 정상이면 authentication이 리턴
            // DB에 있는 username과 password가 일치한다
            Authentication authentication = // authentication에 로그인한 내 정보가 담김
                    authenticationManager.authenticate(authenticationToken); // Token을 통해 로그인 시도 정상적으로 작동되면 위 authentication에 로그인한 내 정보가 담김

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            System.out.println("로그인 완료됨" + principalDetails.getMember().getMemberNo()); // getMemberNo 이 제대로 나왔다는 것은 로그인이 되었다는 뜻

            //authentication 객체가 session 영역에 저장을 해야하고 그 방법이 return 해주면 됨
            // 리턴의 이유는 권한 관리가를 security가 대신 해주기 때문에 편하려고 하는거임
            // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음 근데 단지 권한 처리 때문에 session 넣어줍니다
            return authentication;
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("==========================");
        // 2. 정상인지 로그인 시도 authenticationManager 로 로그인 시도하면 PrincipalDetailsService 호출 loadUserByUsername() 함수 실행

        // 3. PrincipalDetails 를 세션에 담고 // 권한때문에

        // 4. JWT 토큰을 만들어서 응답해주면 됨
        return null; // 오류가 나면 null 반환
    }

    // 전체적인 순서
    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행된다
    // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT 토큰을 response 해주면 된다
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨:인증이 완료되었다는 뜻임");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME)) //토큰 만료시간 System.currentTimeMillis은 현재시간 뒤에는 1분 * 10 = 10분 토큰 만료시간은 10분
                .withClaim("id", principalDetails.getMember().getId())
                .withClaim("username", principalDetails.getMember().getMemberNo()) // 비공개 클레임 마음대로 해도됨
                .withArrayClaim("role", principalDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                        .toArray(String[]::new))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken); // Bearer은 무조건 한 칸 띄어야 함
    }
}