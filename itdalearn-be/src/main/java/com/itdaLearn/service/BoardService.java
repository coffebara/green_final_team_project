package com.itdaLearn.service;

import com.itdaLearn.Mapper.BoardMapper;

import com.itdaLearn.dto.BoardSaveDto;
import com.itdaLearn.entity.BoardEntity;

import com.itdaLearn.something.Header;
import com.itdaLearn.something.Pagination;
import com.itdaLearn.something.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BoardService {
    private final BoardMapper boardMapper;

    public Header<List<BoardEntity>> getBoardList(int page, int size, Search search) {
        HashMap<String, Object> paramMap = new HashMap<>();

        if (page <= 1) {    //페이지가 1 이하로 입력되면 0으로 고정,
            paramMap.put("page", 0);
        } else {            //페이지가 2 이상
            paramMap.put("page", (page - 1) * size);
        }
        paramMap.put("size", size);
        paramMap.put("sk", search.getSk());
        paramMap.put("sv", search.getSv());

        List<BoardEntity> boardList = boardMapper.getBoardList(paramMap);
        Pagination pagination = new Pagination(
                boardMapper.getBoardTotalCount(paramMap),
                page,
                size,
                10
        );

        return Header.OK(boardList, pagination);
    }

    public Header<BoardEntity> getBoardOne(Long idx) {
        return Header.OK(boardMapper.getBoardOne(idx));
    }

    public Header<BoardEntity> insertBoard(BoardSaveDto boardSaveDto) {
        BoardEntity entity = boardSaveDto.toEntity();
        if (boardMapper.insertBoard(entity) > 0) {
            return Header.OK(entity);
        } else {
            return Header.ERROR("ERROR");
        }
    }

    public Header<BoardEntity> updateBoard(BoardSaveDto boardSaveDto) {
        BoardEntity entity = boardSaveDto.toEntity();
        if (boardMapper.updateBoard(entity) > 0) {
            return Header.OK(entity);
        } else {
            return Header.ERROR("ERROR");
        }
    }

    public Header<String> deleteBoard(Long idx) {
        if (boardMapper.deleteBoard(idx) > 0) {
            return Header.OK();
        } else {
            return Header.ERROR("ERROR");
        }
    }
}