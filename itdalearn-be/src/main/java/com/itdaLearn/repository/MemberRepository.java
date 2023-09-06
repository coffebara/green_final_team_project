package com.itdaLearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdaLearn.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

//Optional<Member> findByMemberNo(String MemberNo);
	Member findByMemberNo(String memberNo);

    
}


