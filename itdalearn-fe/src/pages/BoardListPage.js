import React, { useState, useEffect } from "react";
import BoardService from "../api/BoardService";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSetting from "../common/Nav";
import Footer from "../common/Footer";
import jwt_decode from "jwt-decode";
import "../styles/Board.css";

const BoardListComponent = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState(""); // select 태그의 초기 값으로 'title' 설정

  const token = localStorage.getItem("token");
  let decodedToken;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태 변수 추가

  useEffect(() => {
    fetchBoards(currentPageNum);
  }, [currentPageNum]);

  useEffect(() => {
    // searchKeyword 값이 변경될 때마다 검색 API 호출
    if (searchKeyword) {
      searchBoards(currentPageNum, searchKeyword);
    } else {
      fetchBoards(currentPageNum); // 검색 키워드가 없으면 모든 게시글 가져오기
    }
  }, [searchKeyword]);

  function fetchBoards(pageNum) {
    BoardService.getBoards(pageNum)
      .then((res) => {
        console.log("오류 없음 1 : ", res);
        setBoards(res.data.content); // 게시물 목록 업데이트
        setPageInfo({
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
          currentPage: res.data.number,
          currentElements: res.data.numberOfElements,
        });
      })
      .catch((error) => {
        // API 요청 실패 시 실행될 로직 추가
        console.error("오류 발생 1:", error);
      });
  }

  function searchBoards(pageNum, type, keyword) {
    BoardService.searchBoards(pageNum, type, keyword)
      .then((res) => {
        console.log(res);
        setBoards(res.data.content); // 검색된 게시물 목록 업데이트
        setPageInfo({
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
          currentPage: res.data.number,
          currentElements: res.data.numberOfElements,
        });
      })
      .catch((error) => {
        console.error("오류 발생 2:", error);
      });
  }

  const createBoard = () => {
    let token = localStorage.getItem('token'); 
    if (!token) {
        alert('로그인 후 사용해주세요');
        navigate('/members/login');
        return; 
      }


    navigate("/board/write/_create");
  };

  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    searchBoards(0, searchType, keyword);
  };

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
  };
  const goToLogin=()=>{
    navigate("members/login")
  };

  return (
    <div>
      <NavSetting />
      <div className= "container board_setting">
      <h2 className="text-center">게시판</h2>

      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>

          <tbody>
            {boards.map((board) => (
              <tr key={board.bno}>
                <td> {board.bno} </td>
                <td>
                  <Link to={`/board/detail/${board.bno}`} className="board_title">{board.title}</Link>
                </td>
                <td> {board.memberNo} </td>
                <td> {new Date(board.createdTime).toLocaleDateString()} </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
      <div className="mt-2">
        <select value={searchType} onChange={handleSelectChange} className="me-2">
          <option value="title">제목</option>
          <option value="contents">내용</option>
          <option value="memberNo">작성자</option>
        </select>
        <input type="text" value={keyword} onChange={handleInputChange} />
        <button className="btn btn-primary btn-sm ms-2 me-2" onClick={() => handleSearch(searchType, keyword)}>
          Search
        </button>
        <button className="btn btn-success btn-sm" onClick={createBoard}>
          글쓰기
        </button>
      </div>
      <div className="mt-3 mb-4">
        <button className="btn btn-link btn-sm me-1"
          onClick={() =>
            setCurrentPageNum((prevPage) => Math.max(prevPage - 1, 0))
          }
          disabled={currentPageNum === 0}
        >
          Previous
        </button>

        {[...Array(pageInfo.totalPages).keys()].map((i) => (
          <button key={i} onClick={() => setCurrentPageNum(i)} className="btn btn-link btn-sm ms-1">
            {i + 1}
          </button>
        ))}

        <button className="btn btn-link btn-sm ms-2 "
          onClick={() =>
            setCurrentPageNum((nextPage) =>
              Math.min(nextPage + 1, pageInfo.totalPages)
            )
          }
          disabled={currentPageNum === pageInfo.totalPages - 1}
        >
          Next
        </button>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default BoardListComponent;
