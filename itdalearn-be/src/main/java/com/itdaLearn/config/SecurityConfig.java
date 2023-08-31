package com.itdaLearn.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity // 필터 체인 관리 시작 어노테이션
@RequiredArgsConstructor
//@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) // 특정 주소 접근시 권한 및 인증을 위한 어노테이션 활성화
public class SecurityConfig {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // 정적 리소스들이 보안필터를 거치지 않게끔
        return (web) -> web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/font/**", "/images/","/css/**", "/js/**", "/img/**", "/cart/**", "/order/**", "/orders/**", "/cart/orders/**", "/admin/courses", "/admin/**", "/cartCourse/**", "/order/**", "/board/**", "/board", "/write", "/write/**", "/admin/**", "/main/**");
    }

    // 해당 메서드의 리턴되는 오브젝트를 IoC로 등록해준다
    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().disable()                      // cors 방지
                .csrf().disable()                           // csrf 방지
                .headers().frameOptions().disable();

        http.authorizeRequests()
                .antMatchers("/user/**").authenticated()
                .antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
                .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
                .mvcMatchers(HttpMethod.OPTIONS, "/**","/members/**", "/item/**", "/images/**", "/admin/**", "/cart/**", "/order/**", "/orders/**", "/cart/orders/**", "/admin/course", "/admin/**", "/cartCourse/**", "/order/**", "/admin/**", "/board/**", "/board", "/write " ,"/write/**", "/main/**").permitAll()
                .anyRequest().permitAll();


        http.formLogin()

        .loginPage("/members/login") // 해당 메소드가 있다면 해당 파일이 출력
        .loginProcessingUrl("/login") // login form에서 action을 동일하게 적어줘야 한다.
        .defaultSuccessUrl("http://localhost:3000/") // 로그인이 성공했을 때 돌아갈 주소를 적어준다.
//        .failureUrl("/login?error=true") // 로그인이 실패했을 때 돌아가는 주소
        .usernameParameter("memberNo")
        .passwordParameter("memberPwd")
        .and()
        .logout()
        .logoutUrl("/logout")
        .logoutSuccessUrl("/course") // 로그아웃을 성공했을 때 돌아가는 주소
        .invalidateHttpSession(true) // 로그아웃 시 session을 전부 날린다.
        .deleteCookies("JSESSIONID", "remember-me"); // 인자로 적은 값의 cookies를 죽인다.
        // status code 핸들링
        http.exceptionHandling().accessDeniedPage("/denied");

        return http.build();
    }
}




