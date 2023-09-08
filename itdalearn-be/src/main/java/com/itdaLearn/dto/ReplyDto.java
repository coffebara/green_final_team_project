package com.itdaLearn.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyDto {
    private Long cno;
    private String content;
    private Long memberId;
}