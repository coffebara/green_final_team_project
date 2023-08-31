zpackage com.itdaLearn.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "TB_BOARD")

public class BoardEntity {
    @Id
    @SequenceGenerator(name = "SEQ_TB_BOARD", sequenceName = "SEQ_TB_BOARD", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TB_BOARD")
    private Long idx;
    private String title;
    private String contents;
    private String createdBy;
    private Date createdAt;
}