package com.itdaLearn.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDto {
    private Long bno;
    private int type;
    private String title;
    private String contents;
    private String memberNo;
//    private String username;

}
