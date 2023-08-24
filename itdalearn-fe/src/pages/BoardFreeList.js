import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import NavSetting from "../common/Nav";
import Footer from "../common/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BoardFreeList.css'


export default function BoardFreeList() {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList] = useState([]);

    const [curPage, setCurPage] = useState(0); //현재 페이지 세팅
    const [prevBlock, setPrevBlock] = useState(0); //이전 페이지 블록
    const [nextBlock, setNextBlock] = useState(0); //다음 페이지 블록
    const [lastPage, setLastPage] = useState(0); //마지막 페이지

    const [search, setSearch] = useState({
        page: 1,
        sk: '',
        sv: '',
    });

    const getBoardList = async () => {
        if (search.page === curPage) return; //현재 페이지와 누른 페이지가 같으면 return

        const queryString = Object.entries(search)
            .map((e) => e.join('='))
            .join('&');

        const resp = await (
            await axios.get('//localhost:9090/board?' + queryString)
        ).data; // 2) 게시글 목록 데이터에 할당

        setBoardList(resp.data); // 3) boardList 변수에 할당
        const pngn = resp.pagination;

        const {endPage, nextBlock, prevBlock, startPage, totalPageCnt} = pngn;

        setCurPage(search.page);
        setPrevBlock(prevBlock);
        setNextBlock(nextBlock);
        setLastPage(totalPageCnt);

        const tmpPages = [];
        for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
        }

        setPageList(tmpPages);
    };

    const moveToWrite = () => {
        navigate('/write');
    };

    const onClick = (event) => {
        let value = event.target.value;
        setSearch({
            ...search,
            page: value,
        });

        getBoardList();
    };

    const onChange = (event) => {
        const {value, name} = event.target; //event.target에서 name과 value만 가져오기
        setSearch({
            ...search,
            [name]: value,
        });
    };

    const onSearch = () => {
        if (search.sk !== '' && search.sv !== '') {
            setSearch({
                ...search,
                page: 1,
            });
            setCurPage(0);
            getBoardList();
        }
    };
    // 게시글 작성일을 원하는 형식으로 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year=date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year} . ${month} . ${day}`;
    };


    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, [search]);

    return (
        <div>
            <NavSetting/>
            <div className="container w-75">
                <div className="board_board_bottom">게시판</div>
                <div className="d-flex bd-highlight board_board_bottom">

                    <div className=" bd-highlight">&nbsp;&nbsp;&nbsp;&nbsp;글번호&nbsp;
                        <ul >
                            {boardList.map((board) => (
                                // 4) map 함수로 데이터 출력
                                <div className="board_board" key={board.idx}>
                                    &nbsp;&nbsp;  &nbsp;&nbsp;  {board.idx}&nbsp;
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className=" flex-grow-1 bd-highlight">&nbsp;&nbsp;글제목&nbsp;&nbsp;
                        <ul>
                            {boardList.map((board) => (
                                // 4) map 함수로 데이터 출력
                                <li className="board_board" key={board.idx}>
                                    &nbsp;&nbsp;  <Link to={`/board/${board.idx}`}>{board.title}</Link>&nbsp;&nbsp;
                                </li>
                            ))}
                        </ul></div>
                    <div className=" bd-highlight ">&nbsp;&nbsp;작성자&nbsp;&nbsp;
                        <ul>
                            {boardList.map((board) => (
                                // 4) map 함수로 데이터 출력
                                <div className="board_board" key={board.idx}>
                                    &nbsp; &nbsp; {board.createdBy}&nbsp;&nbsp;&nbsp;
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className=" bd-highlight">&nbsp;&nbsp;작성일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ul>
                            {boardList.map((board) => (
                                // 4) map 함수로 데이터 출력
                                <div className="board_board" key={board.idx}>
                                    &nbsp;&nbsp;  {formatDate(board.createdAt)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            ))}
                        </ul>
                    </div>

                </div>
                <div>
                    <button onClick={onClick} value={1}>
                        &lt;&lt;
                    </button>
                    <button onClick={onClick} value={prevBlock}>
                        &lt;
                    </button>
                    {pageList.map((page, index) => (
                        <button key={index} onClick={onClick} value={page}>
                            {page}
                        </button>
                    ))}
                    <button onClick={onClick} value={nextBlock}>
                        &gt;
                    </button>
                    <button onClick={onClick} value={lastPage}>
                        &gt;&gt;
                    </button>
                </div>
                <br/>
                <div>
                    <select name="sk" onChange={onChange}>
                        <option value="">-선택-</option>
                        <option value="title">제목</option>
                        <option value="contents">내용</option>
                    </select>

                    <input type="text" name="sv" id="" onChange={onChange}/>
                    <button className="btn btn-outline-primary" onClick={onSearch}>검색</button>
                </div>
                <br/>
                <div>
                    <button onClick={moveToWrite}>글쓰기</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

