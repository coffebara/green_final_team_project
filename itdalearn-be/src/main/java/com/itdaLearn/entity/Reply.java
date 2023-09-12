package com.itdaLearn.entity;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Setter
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reply_seq")
    @SequenceGenerator(name = "reply_seq", sequenceName = "reply_seq", allocationSize = 1)
    @Column(name = "comment_no")
    private Long cno;

    @Column(name="comment_contents" ,nullable = false, length = 500)
    private String content;

    @ManyToOne
    @JoinColumn(name = "board_no")
    private Board board;

    @Column(name = "member_no")
    private String memberNo;
}
