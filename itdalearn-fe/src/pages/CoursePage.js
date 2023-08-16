/* eslint-disable */
import "../styles/lecture.css"; // css 불러오기
import data from "../common/data"; // data 불러오기
import { useNavigate, useParams } from "react-router-dom"; // router-dom에서 useNavigate, useParams 가져오기
// useNavigate: 페이지 전환, URL 변경, 뒤로가기/앞으로가기 등을 처리
// useParams: 동적 경로 매개변수를 가져와서 컴포넌트에서 사용
import { Col } from "react-bootstrap"; // 부트스트랩에서 Col 컴포넌트 가져오기
// Col: 그리드 시스템에서 컬럼(테이블의 열)의 역할을 하는 컴포넌트
import { createContext, useState } from "react"; // react에서 createContext와 useState를 가져옵니다
// createContext: React 컨텍스트를 생성하는 데 사용
// useState: 상태를 관리하기 위한 Hook
//  useSelector: Redux 상태(store)에서 원하는 데이터를 선택하기 위해 사용되는 Hook
import { Button } from "@mui/material"; // mui 패키지에서 Button을 가져옵니다 (라이브러리)

import Nav from "../common/Nav";
import Footer from "../common/Footer";

export const ThemeContext = createContext(null);

function findObjectsBykey(objArray, key, value) {
    return objArray.filter((obj) => obj[key] === value);
}

const aliceObjects = findObjectsBykey(data, "all"); // 카테고리 초기 값

function CoursePage() {
    let { id } = useParams();
    let [products] = useState(data);

    const [handButtonClick, sethandButtonClick] = useState(aliceObjects);

    return (
        <>
        <Nav/>
            <div className="lecture-App">
                <div className="lecture-App-main">
                    <div className="lecture-front">
                        <h1>Front End</h1>
                    </div>
                    <div className="lte">
                        <img src="https://ifh.cc/g/rzzZtv.png" width="800px" />
                    </div>
                    <div className="lecture-mlyon">
                        <div className="lecture-varil">
                            <h2>여태까지 경험하지 못한 강의</h2>
                            <p>
                                새롭게 선보이는 it da의 강의 컨텐츠
                                <br />
                                이 컨텐츠를 가지고, 우리는 다시 한번 도약합니다.
                                <br />
                                품질 좋은 강의를 유지하기 위해 끊임 없이 노력하는
                                <br />
                                그야말로 it da의 최고의 콘텐츠 입니다.
                            </p>
                        </div>
                    </div>
                    <div className="lecture-btn">
                        <Button
                            id="lt-btn"
                            variant="outlined"
                            onClick={() => {
                                sethandButtonClick(findObjectsBykey(data, "all"));
                            }}
                        >
                            전체
                        </Button>
                        <Button
                            id="lt-btn"
                            variant="outlined"
                            onClick={() => {
                                sethandButtonClick(findObjectsBykey(data, "category", "초급"));
                            }}
                        >
                            초급
                        </Button>
                        <Button
                            id="lt-btn"
                            variant="outlined"
                            onClick={() => {
                                sethandButtonClick(findObjectsBykey(data, "category", "중급"));
                            }}
                        >
                            중급
                        </Button>
                        <Button
                            id="lt-btn"
                            variant="outlined"
                            onClick={() => {
                                sethandButtonClick(findObjectsBykey(data, "category", "고급"));
                            }}
                        >
                            고급
                        </Button>
                    </div>
                    <div className="App-lecture">
                        {handButtonClick.map((product, id) => (
                            <div key={id} className="lecture-container">
                                <Hhs key={id} products={product} i={id + 1} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

function Hhs(props) {
    let navigate = useNavigate();
    return (
        <>
            <Col>
                <img
                    onClick={() => {
                        navigate(`/course/${props.products.id}`);
                    }}
                    src={props.products.image}
                />
                <p>{props.products.title}</p>
            </Col>
        </>
    );
}

export default CoursePage;
