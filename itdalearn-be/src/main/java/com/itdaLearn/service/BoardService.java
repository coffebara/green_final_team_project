package com.itdaLearn.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


import com.itdaLearn.config.ResourceNotFoundException;
import com.itdaLearn.entity.Board;
import com.itdaLearn.repository.BoardRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class BoardService {
    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Page<Board> getBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }


    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }
    public ResponseEntity<Board> getBoard(Long bno) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+bno+"]"));
        return ResponseEntity.ok(board);
    }
    public ResponseEntity<Board> updateBoard(
            Long bno, Board updatedBoard) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+bno+"]"));
        board.setType(updatedBoard.getType());
        board.setTitle(updatedBoard.getTitle());
        board.setContents(updatedBoard.getContents());
        board.setUpdatedTime(new Date());

        Board endUpdatedBoard = boardRepository.save(board);
        return ResponseEntity.ok(endUpdatedBoard);
    }
    public ResponseEntity<Map<String, Boolean>> deleteBoard(
            Long bno) {
        Board board = boardRepository.findById(bno)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+bno+"]"));

        boardRepository.delete(board);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : ["+bno+"]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    public Board findBoard(Long bno) {
        return boardRepository.findById(bno).orElseThrow(() -> new IllegalArgumentException("Invalid board Id:" + bno));
    }
    public Page<Board> searchBoardsByTitle(String keyword, Pageable pageable) {
        return boardRepository.findByTitleContaining(keyword, pageable);
    }

    public Page<Board> searchBoardsByContent(String keyword, Pageable pageable) {
        return boardRepository.findByContentsContaining(keyword, pageable);
    }
    public Page<Board> searchBoardsByMemberNo(String keyword, Pageable pageable) {
        return boardRepository.findByMemberNoContaining(keyword, pageable);
    }


}