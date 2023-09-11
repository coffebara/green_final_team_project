package com.itdaLearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdaLearn.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Member findByMemberNo(String memberNo);

	Optional<Member> findById(Long id);

//	Optional<Member> findByMemberNo(String memberNo);


}


