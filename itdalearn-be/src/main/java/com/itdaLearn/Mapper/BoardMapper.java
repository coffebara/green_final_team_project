package com.itdaLearn.Mapper;

import com.itdaLearn.entity.BoardEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardEntity> getBoardList(HashMap<String, Object> paramMap);  // 수정된 부분: paramMap 추가

    int getBoardTotalCount(HashMap<String, Object> paramMap);  // 수정된 부분: paramMap 추가

    BoardEntity getBoardOne(Long idx);

    int insertBoard(BoardEntity entity);


    int updateBoard(BoardEntity entity);

    int deleteBoard(Long idx);


}
