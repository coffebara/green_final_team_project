//package com.itdaLearn.config;
//
//
//import com.itdaLearn.service.MemberDetailService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//
//@RequiredArgsConstructor
//@Configuration
//public class WebSecurityConfig {
//    private final MemberDetailService memberService;
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        // 정적 리소스들이 보안필터를 거치지 않게끔
//        return (web) -> web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/font/**", "/admin/**", "/admin/courses/**", "/images/**");
//    }
//
//    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.cors().disable()                      // cors 방지
//                .csrf().disable()                           // csrf 방지
//                .headers().frameOptions().disable();
//
//        http.authorizeRequests()
//                .antMatchers("/user/**").authenticated()
//                .antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
//                .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
//                .mvcMatchers(HttpMethod.OPTIONS, "/**","/images/**", "/admin/**", "/admin/courses/**").permitAll()
//                .anyRequest().permitAll();
//
//
//        http.formLogin()
//
//                .loginPage("/members/login") // 해당 메소드가 있다면 해당 파일이 출력
//                .loginProcessingUrl("/login") // login form에서 action을 동일하게 적어줘야 한다.
//                .defaultSuccessUrl("http://localhost:3000/") // 로그인이 성공했을 때 돌아갈 주소를 적어준다.
////        .failureUrl("/login?error=true") // 로그인이 실패했을 때 돌아가는 주소
//                .usernameParameter("memberNo")
//                .passwordParameter("memberPwd")
//                .and()
//
//                .logout()
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/course") // 로그아웃을 성공했을 때 돌아가는 주소
//                .invalidateHttpSession(true) // 로그아웃 시 session을 전부 날린다.
//                .deleteCookies("JSESSIONID", "remember-me") // 인자로 적은 값의 cookies를 죽인다.
//                .and();
//        // status code 핸들링
//        http.exceptionHandling().accessDeniedPage("/denied");
//
//        return http.build();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, MemberDetailService memberService)
//        throws Exception {
//        return http.getSharedObject(AuthenticationManagerBuilder.class)
//                .userDetailsService(memberService)
//                .passwordEncoder(bCryptPasswordEncoder)
//                .and()
//                .build();
//    }
//
//}

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//    	http.csrf().disable();
//    	http.formLogin()
//
//.loginPage("/members/login") // 해당 메소드가 있다면 해당 파일이 출력
//.loginProcessingUrl("/login") // login form에서 action을 동일하게 적어줘야 한다.
//.defaultSuccessUrl("http://localhost:3000/") // 로그인이 성공했을 때 돌아갈 주소를 적어준다.
//.failureUrl("/login?error=true") // 로그인이 실패했을 때 돌아가는 주소
//                .loginPage("/loginForm")
//                .defaultSuccessUrl("/")
//                .usernameParameter("email")
//                .failureUrl("/members/login/error")
//                .and()
//                .logout()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/members/logout"))
//                .logoutSuccessUrl("/")
//        ;
//
//        http.authorizeRequests()
//        		.antMatchers("/user/**").authenticated() // 인증만 되면 들어갈 수 있는 주소
//        		.antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
//        		.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
//                .mvcMatchers("//", "/members/**", "/item/**", "/images/**", "/admin/**", "/cart/**", "/order/**", "/orders/**", "/cart/orders/**", "/admin/course", "/admin/**", "/cartCourse/**", "/order/**", "/admin/**", "/board/**", "/board", "/write " ,"/write/**", "/main/**").permitAll();
//
//               .mvcMatchers("/admin/**").hasRole("ADMIN")
//                .anyRequest().authenticated()
//        ;
//
//        http.exceptionHandling()
//                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
//        ;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//    
//    @Bean
//   public BCryptPasswordEncoder encodePwd() {
//       return new BCryptPasswordEncoder();
//   }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(memberService)
//                .passwordEncoder(passwordEncoder());
//    }
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().antMatchers("/images/","/css/**", "/js/**", "/img/**", "/cart/**", "/order/**", "/orders/**", "/cart/orders/**", "/admin/courses", "/admin/**", "/cartCourse/**", "/order/**", "/board/**", "/board", "/write", "/write/**", "/admin/**", "/main/**");
//    }
//
//}