import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Admin_Course.css";
import { useNavigate } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import Admin_CoursePagination from "./Admin_CoursePagination.js";

export default function Admin_Course() {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:9090";
    const [courses, setCourses] = useState([]); // 강의 리스트
    const [currPage, setCurrPage] = useState(1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(0); // 총 페이지
    const [displayPageNum, setDisplayPageNum] = useState([]); // 페이지네이션 숫자
    const [pageSize, setPageSize] = useState(0); // 한 페이지 글 개수
    const [inputs, setInputs] = useState({
        // api 요청할 데이터
        page: 1,
        searchBy: "",
        searchQuery: "",
    });

    //강의 리스트 호출
    const getCourseList = async () => {
        const postPage = inputs.page - 1; // pageable객체는 page가 0부터 시작하므로
        const queryString =
            "/" + postPage + "?&searchBy=" + inputs.searchBy + "&searchQuery=" + inputs.searchQuery;
        try {
            const response = await axios.get(baseUrl + "/admin/courses" + queryString);
            const { courseList } = response.data;
            const { content, number, size, totalPages } = courseList; // 강의리스트, 현재페이지, 페이지당강의수, 총페이지
            setCourses(content);
            setCurrPage(number + 1);
            setTotalPage(totalPages);
            setPageSize(size);
        } catch (error) {
            console.log(error);
        }
    };

    // 페이지 변경 시 강의 리스트 호출
    useEffect(() => {
        getCourseList();
    }, [inputs.page]);

    // 강의 상세보기
    const handleMoveDetailPage = (courseNo) => {
        navigate("/admin/course/" + courseNo);
    };

    //----- 페이지네이션 ----------------------
    useEffect(() => {
        const getDisplayPageNum = () => {
            let startPage = Math.floor((currPage - 1) / pageSize) * pageSize + 1;
            let endPage = startPage + pageSize - 1;

            if (startPage <= 0) {
                startPage = 1;
                endPage = pageSize;
            }
            if (endPage > totalPage) {
                endPage = totalPage;
            }

            const tmpPages = [];
            for (let i = startPage; i <= endPage; i++) {
                tmpPages.push(i);
            }
            setDisplayPageNum(tmpPages);
        };
        getDisplayPageNum();
    }, [currPage, totalPage]);

    // 페이지네이션 버튼 클릭 이벤트
    const handlerClickBtn = (e) => {
        let value = e.target.text;
        setInputs({
            ...inputs,
            page: value,
        });
    };
    // '<' -10페이지 이동
    const previousPage = () => {
        if (currPage > 1) {
            setInputs({
                ...inputs,
                page: Math.floor((currPage - 11) / pageSize) * pageSize + 1,
            });
        }
    };
    // '>' +10페이지 이동
    const nextPage = () => {
        if (currPage < totalPage) {
            setInputs({
                ...inputs,
                page: Math.round((currPage + (pageSize / 2 - 1)) / pageSize) * pageSize + 1,
            });
        }
    };
    // 첫 페이지로 이동
    const firstPage = () => {
        setInputs({
            ...inputs,
            page: 1,
        });
    };
    // 마지막 페이지로 이동
    const lastPage = () => {
        setInputs({
            ...inputs,
            page: totalPage,
        });
    };

    //---- 검색 -----------------------

    // 검색 입력값 받기
    const handleOnChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    // 검색 버튼
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.searchBy !== "" && inputs.searchQuery !== "") {
            setInputs({
                ...inputs,
                page: 1,
            });
            getCourseList();
        }
    };

    return (
        <Container>
            <h2>강의 리스트 - {currPage} 페이지</h2>
            <button className="courseListBtn" onClick={() => navigate("/admin/course")}>
                강의 등록
            </button>
            <div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">강의</th>
                            <th scope="col">강사</th>
                            <th scope="col">가격</th>
                            {/* <th scope="col">설명1</th> */}
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {courses.map((item, i) => (
                            <tr key={i}>
                                <td scope="row">{item.courseNo}</td>
                                <td
                                    style={{ cursor: "pointer", color: "tomato"}}
                                    onClick={() => handleMoveDetailPage(item.courseNo)}
                                >
                                    {item.courseTitle}
                                </td>
                                <td>{item.courseTeacher}</td>
                                <td>{item.coursePrice}</td>
                                {/* <td>{item.courseDec1}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Admin_CoursePagination
                    displayPageNum={displayPageNum}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    handlerClickBtn={handlerClickBtn}
                    currPage={currPage}
                    firstPage={firstPage}
                    lastPage={lastPage}
                    totalPage={totalPage}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-inline justify-content-center">
                    <div>
                        <select className="form-control" name="searchBy" onChange={handleOnChange}>
                            <option value="">- 검색 방법 선택 -</option>
                            <option value="courseTitle">상품명</option>
                            <option value="courseTeacher">강사명</option>
                        </select>
                    </div>
                    <input
                        name="searchQuery"
                        type="text"
                        className="form-control"
                        placeholder="검색어를 입력해주세요"
                        onChange={handleOnChange}
                    />
                    <button id="searchBtn" type="submit" className="btn btn-primary">
                        검색
                    </button>
                </div>
            </form>
        </Container>
    );
}
