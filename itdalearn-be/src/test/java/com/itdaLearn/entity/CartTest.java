package com.itdaLearn.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import com.itdaLearn.repository.CartRepository;
import com.itdaLearn.repository.MemberRepository;

@SpringBootTest
@Transactional
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public class CartTest {
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PersistenceContext
	EntityManager em;
	
	public Member saveMember() {
		
		Member member = new Member();
		member.setMemberEmail("test@tester.com");
		member.setMemberNo("tester");
		member.setMemberPwd("12345678");
		member.setMemberName("user");
		member.setRole("ROLE_USER");
		member.setMemberTel("010-111-1111");
	
		
		return memberRepository.save(member);
	}
	
	@Test
	@DisplayName("장바구니 회원 엔티티 매핑 조회 테스트")
	public void findCartMemberTest() {
		
		Member member = saveMember();
		
		Cart cart = new Cart();
		cart.setMember(member);
		cartRepository.save(cart);
		em.flush();
		em.clear();
		Cart savedCart = cartRepository.findById(cart.getCartNo())
				.orElseThrow(EntityNotFoundException::new);
		
		assertEquals(savedCart.getMember().getId(), member.getId());
		
	}
	

}
