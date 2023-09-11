//package com.itdaLearn.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.BeanIds;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.itdaLearn.config.jwt.JwtAuthenticationFilter;
//import com.itdaLearn.config.jwt.JwtAuthorizationFilter;
//import com.itdaLearn.repository.MemberRepository;
//import com.itdaLearn.service.PrincipalDetailsService;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@EnableWebSecurity
//@Configuration
//@EnableGlobalMethodSecurity(securedEnabled = true)
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//	private final CorsConfig corsConfig;
//	private final MemberRepository memberRepository;
//
//
//	private final PrincipalDetailsService memberService;
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.addFilterBefore(new JwtAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
//		http.addFilter(corsConfig.corsFilter()).csrf().disable() // csrf 방지
//				.headers().frameOptions().disable();
//		http
//				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션사용 x
//				.and()
////                .addFilter(corsFilter) // 모든 요청은 모든 필터를 타고감 (cors 정책에서 벗어날 수 있따)
//				.formLogin().disable().httpBasic().disable()
//				.addFilter(new JwtAuthenticationFilter(authenticationManager()))
//				.addFilter(new JwtAuthorizationFilter(authenticationManager(), memberRepository)).authorizeRequests()
//				.mvcMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//				.antMatchers("/cart", "/user", "/orders")
//					.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//				.antMatchers("/admin/**")
//					.access("hasRole('ROLE_ADMIN')")
//				// .antMatchers("/cart", "/user")
//				.anyRequest().permitAll();
//
//		http.exceptionHandling().accessDeniedPage("/denied");
//
//	}
//
//	@Bean
//	public WebSecurityCustomizer webSecurityCustomizer() {
//		// 정적 리소스들이 보안필터를 거치지 않게끔
//		return (web) -> web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/font/**", "/images/", "/css/**");
//	}
//
//
////	@Bean
////	public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder,
////													   UserDetailsService userDetailsService) throws Exception {
////		return http.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(memberService)
////				.passwordEncoder(bCryptPasswordEncoder).and().build();
////	}
//
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(memberService).passwordEncoder(bCryptPasswordEncoder());
//	}
//
//	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}
//
//
//	@Bean
//	public BCryptPasswordEncoder bCryptPasswordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//}

package com.itdaLearn.config;

import com.itdaLearn.config.jwt.JwtAuthenticationFilter;
import com.itdaLearn.config.jwt.JwtAuthorizationFilter;
import com.itdaLearn.repository.MemberRepository;
import com.itdaLearn.service.PrincipalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.filter.CorsFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final CorsConfig corsConfig;
	private final MemberRepository memberRepository;


	private final PrincipalDetailsService memberService;


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.addFilterBefore(new JwtAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
		http.addFilter(corsConfig.corsFilter()).csrf().disable() // csrf 방지
				.headers().frameOptions().disable();
		http
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션사용 x
				.and()
				//                .addFilter(corsFilter) // 모든 요청은 모든 필터를 타고감 (cors 정책에서 벗어날 수 있따)
				.formLogin().disable().httpBasic().disable()
				.addFilter(new JwtAuthenticationFilter(authenticationManager()))
				.addFilter(new JwtAuthorizationFilter(authenticationManager(), memberRepository))

				.authorizeRequests()
//					.antMatchers("/members/mypage/check").authenticated()
				.antMatchers("/cart", "/user", "/members/mypage/check").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
				.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
				.anyRequest().permitAll();



//                .antMatchers("/cart/**").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//                .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
//                .mvcMatchers(HttpMethod.OPTIONS, "/**","/members/**", "/item/**", "/images/**", "/admin/**", "/cart/**", "/order/**", "/orders/**", "/cart/orders/**", "/admin/course", "/admin/**", "/cartCourse/**", "/order/**", "/admin/**", "/board/**", "/board", "/write " ,"/write/**", "/main/**").permitAll()
//                .anyRequest().permitAll();
//                .antMatchers("/course/**")
//                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//				.antMatchers("/api/v1/user/**").access("hasRole('ROLE_USER')").antMatchers("/api/v1/admin/**")
//				.access("hasRole('ROLE_ADMIN')").anyRequest().permitAll();
//
		http.exceptionHandling().accessDeniedPage("/denied");


	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		// 정적 리소스들이 보안필터를 거치지 않게끔
		return (web) -> web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/font/**", "/images/", "/css/**");
	}


//	@Bean
//	public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder,
//													   UserDetailsService userDetailsService) throws Exception {
//		return http.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(memberService)
//				.passwordEncoder(bCryptPasswordEncoder).and().build();
//	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(memberService).passwordEncoder(bCryptPasswordEncoder());
	}

	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}


	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}