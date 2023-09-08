package com.itdaLearn.repository;


import com.itdaLearn.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BoardRepository extends JpaRepository<Board,Long> {

//
    Page<Board> findAll(Pageable pageable);
    Page<Board> findByTitleContaining(String keyword, Pageable pageable);
    Page<Board> findByContentsContaining(String keyword, Pageable pageable);
    Page<Board> findByMemberNoContaining(String keyword, Pageable pageable);


}
