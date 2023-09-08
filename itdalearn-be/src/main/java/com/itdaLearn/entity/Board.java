package com.itdaLearn.entity;



import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "board")
@Getter
@Setter

public class Board {
    @Id
    @Column(name = "board_no")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "board_seq")
    @SequenceGenerator(name = "board_seq", sequenceName = "board_seq", allocationSize = 1)
    private Long bno;

    @Column(name = "board_type")
    private int type;

    @Column(name = "board_title")
    private String title;

    @Column(name = "board_contents")
    private String contents;

    @Column(name = "board_username")
    private String username;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "member_no")
    private String memberNo;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "board_created_time")
    private Date createdTime;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "board_updated_time")
    private Date updatedTime;

    @OrderBy("id desc")
    @JsonIgnoreProperties({"board"})
    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Reply> replyList;

}
