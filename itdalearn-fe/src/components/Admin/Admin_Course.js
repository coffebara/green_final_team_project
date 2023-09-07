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
        searchSellStatus: "",
        searchBy: "",
        searchQuery: "",
    });
    const range = 10;

    //강의 리스트 호출
    const getCourseList = async () => {
        const postPage = inputs.page - 1; // pageable객체는 page가 0부터 시작하므로
        const queryString =
            "/" +
            postPage +
            "?&searchSellStatus=" +
            inputs.searchSellStatus +
            "&searchBy=" +
            inputs.searchBy +
            "&searchQuery=" +
            inputs.searchQuery;
        try {
            const response = await axios.get(baseUrl + "/admin/courses" + queryString, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            const { courseList } = response.data;
            const { content, number, size, totalPages } = courseList; // 강의리스트, 현재페이지, 페이지당강의수, 총페이지
            setCourses(content);
            setCurrPage(number + 1);
            setTotalPage(totalPages);
            setPageSize(size);
            console.log(response.data);
        } catch (error) {
            if (error.response.status === 403) {
                alert("관리자 권한이 필요합니다.");
                navigate("/members/login");
            }
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
        const generateDisplayPageNums = () => {
             // 표시할 페이지 숫자 범위

            let startPage = Math.floor((currPage - 1) / range) * range + 1;
            let endPage = startPage + range - 1;

            if (endPage > totalPage) {
                endPage = totalPage;
            }
            const tmpDisplayPages = [];
            for (let i = startPage; i <= endPage; i++) {
                tmpDisplayPages.push(i);
            }

            setDisplayPageNum(tmpDisplayPages);
        };
        generateDisplayPageNums();
    }, [currPage, totalPage]);
    // useEffect(() => {
    //     const getDisplayPageNum = () => {
    //         let startPage = Math.floor((currPage - 1) / pageSize) * pageSize + 1;
    //         let endPage = startPage + pageSize - 1;

    //         if (startPage <= 0) {
    //             startPage = 1;
    //             endPage = pageSize;
    //         }
    //         if (endPage > totalPage) {
    //             endPage = totalPage;
    //         }
    //         const tmpPages = [];
    //         for (let i = startPage; i <= endPage; i++) {
    //             tmpPages.push(i);
    //         }

    //         setDisplayPageNum(tmpPages);
    //     };
    //     getDisplayPageNum();
    // }, [currPage, totalPage]);

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
        if (currPage > 10) {
            setInputs({
                ...inputs,
                page: Math.floor((currPage - range-1) / pageSize) * pageSize + 1,
            });
        } else {
            setInputs({
                ...inputs,
                page: 1,
            });
        }
    };
    // '>' +10페이지 이동
    const nextPage = () => {
        const halfRange = range/2;
        if (currPage < totalPage) {
            setInputs({
                ...inputs,
                page: Math.round((currPage + halfRange-1)/10)*10  + 1,
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

    // 검색 초기화 버튼
    const reset = () => {
        setInputs({
            page: 1,
            searchSellStatus: "",
            searchBy: "",
            searchQuery: "",
        });
    };
    // 검색 초기화되면 리로드
    useEffect(() => {
        if (
            inputs.page === 1 &&
            inputs.searchSellStatus === "" &&
            inputs.searchBy === "" &&
            inputs.searchQuery === ""
        ) {
            getCourseList();
        }
    }, [inputs]);

    return (
        <Container className="my-5 mng-container">
            <h2>강의 관리</h2>

            <div className="my-5">
                <Table bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">강의</th>
                            <th scope="col">강사</th>
                            <th scope="col">가격</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {courses.map((item, i) => (
                            <tr key={i}>
                                <td scope="row">{item.courseNo}</td>
                                <td
                                    style={{ cursor: "pointer", color: "tomato" }}
                                    onClick={() => handleMoveDetailPage(item.courseNo)}
                                >
                                    {item.courseTitle}
                                </td>
                                <td>{item.courseTeacher}</td>
                                <td>{item.coursePrice}</td>
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
            <div className="container mt-3 mb-5 text-center">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-2">
                            <select
                                className="form-control form-select"
                                name="searchSellStatus"
                                onChange={handleOnChange}
                                value={inputs.searchSellStatus}
                            >
                                <option value="">판매 상태...</option>
                                <option value="SELL">판매중</option>
                                <option value="READY">판매대기</option>
                                <option value="WAIT">판매중지</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select
                                className="form-control form-select"
                                name="searchBy"
                                onChange={handleOnChange}
                                value={inputs.searchBy}
                            >
                                <option value="">검색 필터...</option>
                                <option value="courseTitle">상품명</option>
                                <option value="courseTeacher">강사명</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <input
                                name="searchQuery"
                                type="text"
                                className="form-control"
                                placeholder="검색어를 입력해주세요"
                                onChange={handleOnChange}
                                value={inputs.searchQuery}
                            />
                        </div>
                        <div className="col-2">
                            <button id="searchBtn" type="submit" className="btn btn-primary mr-1">
                                검색
                            </button>
                            <button className="btn btn-info  mx-1" onClick={() => reset()}>
                                리셋
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    );
}
