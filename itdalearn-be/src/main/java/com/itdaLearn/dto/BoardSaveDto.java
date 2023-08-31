package com.itdaLearn.dto;

import com.itdaLearn.entity.BoardEntity;
import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardSaveDto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_BOARD_IDX")
    @SequenceGenerator(name = "SEQ_BOARD_IDX", sequenceName = "seq_board_idx", allocationSize = 1)
    private Long idx;

    @NotNull
    private String title;

    @NotNull
    private String contents;

    @NotNull
    private String createdBy;

    public BoardEntity toEntity() {
        return BoardEntity.builder()
                .idx(idx)
                .title(title)
                .contents(contents)
                .createdBy(createdBy)
                .build();
    }

}
