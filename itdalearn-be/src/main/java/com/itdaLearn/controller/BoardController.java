package com.itdaLearn.controller;
import java.util.Map;

import com.itdaLearn.entity.Board;
import com.itdaLearn.entity.Member;
import com.itdaLearn.service.BoardService;
import com.itdaLearn.service.PrincipalDetails;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/")
@Getter
@Setter
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/board")
    public Page<Board> getBoards(Pageable pageable) {
        return boardService.getBoards(pageable);
    }

    @PostMapping("/board")
    public Board createBoard(@RequestBody Board board, Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Member currentMember = principalDetails.getMember();
        board.setMember(currentMember);
        return boardService.createBoard(board);
    }

    @GetMapping("/board/{bno}")
    public ResponseEntity<Board> getBoardByNo(
            @PathVariable Long bno) {
        return boardService.getBoard(bno);
    }

    @PutMapping("/board/{bno}")
    public ResponseEntity<Board> updateBoardByNo(
            @PathVariable Long bno, @RequestBody Board board){
        return boardService.updateBoard(bno, board);
    }
    @DeleteMapping("/board/{bno}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(
            @PathVariable Long bno) {
        return boardService.deleteBoard(bno);
    }
    @GetMapping("/board/search")
    public Page<Board> searchBoards(
            @RequestParam String keyword,
            @RequestParam(required = false) String type,
            Pageable pageable) {
        if ("content".equals(type)) {
            return boardService.searchBoardsByContent(keyword, pageable);
        } else if ("memberNo".equals(type)) { // writer 대신 username 사용
            return boardService.searchBoardsByMemberNo(keyword, pageable);
        } else { // default: search by title
            return boardService.searchBoardsByTitle(keyword, pageable);
        }
    }



}
