package com.itdaLearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdaLearn.entity.Cart;


public interface CartRepository extends JpaRepository<Cart, Long>{
	
	Cart findByMemberId(Long memberId);
}