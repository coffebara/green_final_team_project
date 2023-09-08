package com.itdaLearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdaLearn.entity.Member;

public interface UserRepository extends JpaRepository<Member, Integer>{

	  public Member findByUsername(String username);
}
