import React, { useState, useEffect } from 'react';
import BoardService from '../api/BoardService';
import {Link, useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavSetting from '../common/Nav';
import Footer from '../common/Footer';
import jwt_decode from 'jwt-decode';

const BoardListComponent = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [searchType, setSearchType] = useState(''); // select 태그의 초기 값으로 'title' 설정
    
    const token = localStorage.getItem('token');
    let decodedToken;
    
    if (token) {
      decodedToken = jwt_decode(token);
    }



    const [currentPageNum, setCurrentPageNum] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');  // 검색 키워드 상태 변수 추가
    
    useEffect(() => {
        fetchBoards(currentPageNum);
    }, [currentPageNum]);
    
    useEffect(() => {  // searchKeyword 값이 변경될 때마다 검색 API 호출
        if (searchKeyword) {
            searchBoards(currentPageNum, searchKeyword);
        } else {
            fetchBoards(currentPageNum);  // 검색 키워드가 없으면 모든 게시글 가져오기
        }
    }, [searchKeyword]);
    
    function fetchBoards(pageNum) {
        BoardService.getBoards(pageNum)
            .then((res) => {
                console.log('오류 없음 1 : ', res);
                setBoards(res.data.content);  // 게시물 목록 업데이트
                setPageInfo({
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    currentPage: res.data.number,
                    currentElements: res.data.numberOfElements
                });
            })
            .catch((error) => {  // API 요청 실패 시 실행될 로직 추가
                console.error('Fetch boards error:', error);
            });
    }
    
    function searchBoards(pageNum, type, keyword) {  
        BoardService.searchBoards(pageNum, type, keyword)
            .then((res) => {  
                console.log(res);
                setBoards(res.data.content);  // 검색된 게시물 목록 업데이트
                setPageInfo({
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    currentPage: res.data.number,
                    currentElements: res.data.numberOfElements
                });
            })
            .catch((error) => {  // API 요청 실패 시 실행될 로직 추가
               console.error('Search boards error:', error);
           });
    }
    
    
    const createBoard = () => {
        navigate('/board/write/_create');
    };


    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
        
    };

    const handleSearch = () => {
        searchBoards(0, searchType, keyword); // 첫 페이지의 검색 결과 가져오기
    };
    
    const handleSelectChange = (e) => {
        setSearchType(e.target.value);
    };


    return (
       
        <div>
            <NavSetting/>
            <h2 className="text-center">Boards List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={createBoard}>Create Board</button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>타이틀</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>갱신일</th>

                    </tr>
                    </thead>
                    <tbody>
                    {boards.map((board) => (
                        <tr key={board.bno}>
                            <td> {board.bno} </td>
                            <td><Link to={`/board/detail/${board.bno}`}>{board.title}</Link></td>
                            <td> { board.memberNo} </td>
                            <td> {board.createdTime} </td>
                            <td> {board.updatedTime} </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                <select value={searchType} onChange={handleSelectChange}>
        <option value="title">title</option>
        <option value="contents">contents</option>
        <option value="memberNo">writer</option>
    </select>
    <input type="text" value={keyword} onChange={handleInputChange} />
    <button onClick={() => handleSearch(searchType, keyword)}>Search</button> 
        </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button
                        onClick={() => setCurrentPageNum(prevPage => Math.max(prevPage - 1, 0))}
                        disabled={currentPageNum === 0}
                    >
                        Previous
                    </button>

                    {[...Array(pageInfo.totalPages).keys()].map(i =>
                        (<button key={i} onClick={() => setCurrentPageNum(i)}>
                            {i + 1}
                        </button>)
                    )}

                    <button
                        onClick={() => setCurrentPageNum(nextPage => Math.min(nextPage + 1, pageInfo.totalPages))}
                        disabled={currentPageNum === pageInfo.totalPages-1}
                    >
                        Next
                    </button>
                </div>


            </div>
<Footer/>
        </div>
    
    );
};

export default BoardListComponent;
