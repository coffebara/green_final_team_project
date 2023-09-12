package com.itdaLearn.controller;

import com.itdaLearn.entity.Board;
import com.itdaLearn.entity.Reply;
import com.itdaLearn.service.BoardService;
import com.itdaLearn.service.ReplyService;
import com.itdaLearn.dto.ReplyDto;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/board")
@Getter
@Setter
public class ReplyController {

    private final ReplyService replyService;
    private final BoardService boardService;

    @Autowired
    public ReplyController(ReplyService replyService, BoardService boardService) {
        this.replyService = replyService;
        this.boardService = boardService;
    }

    @PostMapping("/{bno}/replies")
    public ResponseEntity<Reply> saveReply(@PathVariable Long bno, @RequestBody Reply reply) {
        Board board = boardService.findBoard(bno);
        reply.setBoard(board);
        return ResponseEntity.ok(replyService.saveReply(reply));
    }


    @GetMapping("/{bno}/replies/{cno}")
    public ResponseEntity<Reply> getOne(@PathVariable Long bno, @PathVariable Long cno) {
        return ResponseEntity.of(replyService.getOne(cno));
    }

    @PutMapping("/{bno}/replies/{cno}")
    public ResponseEntity<Reply> update(@PathVariable Long bno,
                                        @PathVariable Long cno,
                                        @RequestBody ReplyDto request) {
        return ResponseEntity.ok(replyService.updateReply(cno, request));
    }


    @DeleteMapping("/{bno}/replies/{cno}")
    public ResponseEntity<Void> delete(@PathVariable Long bno,
                                       @PathVariable Long cno) {
        replyService.deleteReply(cno);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{bno}/replies")
    public ResponseEntity<List<Reply>> getRepliesByBoard(@PathVariable Long bno) {
        List<Reply> replies = replyService.getRepliesByBoard(bno);
        return ResponseEntity.ok(replies);
    }
}
