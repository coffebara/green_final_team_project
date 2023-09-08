package com.itdaLearn.service;


import com.itdaLearn.dto.ReplyDto;
import com.itdaLearn.entity.Reply;
import com.itdaLearn.repository.ReplyRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ReplyService {

    private final ReplyRepository replyRepository;

    @Autowired
    public ReplyService(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }


    public Reply saveReply(Reply reply) {
        return replyRepository.save(reply);
    }



    public Optional<Reply> getOne(Long cno) {
        return replyRepository.findById(cno);
    }

    public List<Reply> getRepliesByBoard(Long bno) {
        List<Reply> replies = replyRepository.findByBoard_Bno(bno);
        if (replies == null) {
            return new ArrayList<>();
        }
        return replies;
    }

    public Reply updateReply(Long cno, ReplyDto request) {
        Reply reply = replyRepository.findById(cno)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reply Id:" + cno));

        reply.setContent(request.getContent());
        return replyRepository.save(reply);
    }


    public void deleteReply(Long cno) {
        replyRepository.deleteById(cno);
    }



}
