-- DROP TABLE  TB_BOARD;
-- CREATE TABLE TB_BOARD (IDX BIGINT AUTO_INCREMENT, CONTENTS VARCHAR(255), CREATED_AT TIMESTAMP, CREATED_BY VARCHAR(255), TITLE VARCHAR(255), PRIMARY KEY (IDX));
--
--
-- SELECT IDX, CONTENTS, CONCAT(YEAR(CREATED_AT),'.', MONTH(CREATED_AT),'.', DAY_OF_MONTH(CREATED_AT)) AS CREATED_DATE, CREATED_BY, TITLE
-- FROM TB_BOARD;
--
--
--
-- 시퀀스 생성
CREATE SEQUENCE SEQ_TB_BOARD START WITH 1 INCREMENT BY 1;

-- 테이블 생성
CREATE TABLE TB_BOARD (
                          IDX NUMBER NOT NULL,
                          CONTENTS VARCHAR2(255),
                          CREATED_AT TIMESTAMP,
                          CREATED_BY VARCHAR2(255),
                          TITLE VARCHAR2(255),
                          CONSTRAINT PK_TB_BOARD PRIMARY KEY (IDX)
);

-- 트리거 생성
CREATE OR REPLACE TRIGGER TRG_TB_BOARD
    BEFORE INSERT ON TB_BOARD
    FOR EACH ROW
BEGIN
    :NEW.IDX := SEQ_TB_BOARD.NEXTVAL;
END;
INSERT INTO TB_BOARD (IDX, TITLE, CONTENTS, CREATED_BY, CREATED_AT)
VALUES (1, '게시글 제목1', '게시글 내용1', '작성자1', SYSDATE);

-- 데이터 조회
SELECT IDX, CONTENTS, TO_CHAR(CREATED_AT, 'YYYY.MM.DD') || '.' || TO_CHAR(CREATED_AT, 'MM.DD') || '.' || TO_CHAR(CREATED_AT, 'YYYY') AS CREATED_DATE, CREATED_BY, TITLE
FROM TB_BOARD;
