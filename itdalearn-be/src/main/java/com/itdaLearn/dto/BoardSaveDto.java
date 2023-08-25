package com.itdaLearn.dto;

import com.itdaLearn.entity.BoardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull; // 추가
import javax.validation.constraints.Null; // 추가

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardSaveDto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_BOARD_IDX")
    @SequenceGenerator(name = "SEQ_BOARD_IDX", sequenceName = "seq_board_idx", allocationSize = 1)
    @NotNull(groups = UpdateValidation.class) // 추가
    @Null(groups = CreateValidation.class) // 추가
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

    // 업데이트 시 사용될 Validation 그룹
    public interface UpdateValidation {}

    // 생성 시 사용될 Validation 그룹
    public interface CreateValidation {}
}
