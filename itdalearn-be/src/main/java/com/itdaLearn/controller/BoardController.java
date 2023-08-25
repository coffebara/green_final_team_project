package com.itdaLearn.controller;


import com.itdaLearn.dto.BoardSaveDto;
import com.itdaLearn.entity.BoardEntity;
import com.itdaLearn.service.BoardService;
import com.itdaLearn.something.Header;
import com.itdaLearn.something.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BoardController {
    private final BoardService boardService;

    //Http Get 방식으로 주소 가장 뒤 /board로 접근
    @GetMapping("/board")
    Header<List<BoardEntity>> getBoardList(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, Search search) {
        return boardService.getBoardList(page, size, search);
    }

    //idx의 데이터 1개를 조회한다.
    @GetMapping("/board/{idx}")
    Header<BoardEntity> getBoardOne(@PathVariable Long idx) {
        return boardService.getBoardOne(idx);
    }

    @PostMapping("/board")
    public Header<BoardEntity> createBoard(@RequestBody BoardSaveDto boardSaveDto) {
        // 삽입할 엔티티 생성
        BoardEntity entity = boardSaveDto.toEntity();

        // insertBoard 메서드 호출
        int insertionResult = boardService.insertBoard(entity);

        // 반환값을 활용하여 삽입 결과 확인
        if (insertionResult > 0) {
            return Header.OK(entity); // 삽입 성공
        } else {
            return Header.ERROR("Failed to insert"); // 삽입 실패
        }
    }

    @PatchMapping("/board")
    Header<BoardEntity> updateBoard(@RequestBody BoardSaveDto boardSaveDto) {
        return boardService.updateBoard(boardSaveDto);
    }

    @DeleteMapping("/board/{idx}")
    Header<String> deleteBoard(@PathVariable Long idx) {
        return boardService.deleteBoard(idx);
    }
}