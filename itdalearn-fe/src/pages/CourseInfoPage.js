import Nav from "../common/Nav";
import Footer from "../common/Footer";
import Course from "../components/courseList/Course";
export default function CourseInfoPage() {

    return (
        <>
            <Nav />
            <Course />
            <Footer />
        </>
    );
}


// /* eslint-disable */
// import "../styles/lecture2.css";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import { addCart } from "../store";
// import { useDispatch } from "react-redux";
// import { FaSignal } from "react-icons/fa";
// import { createContext, useState } from "react";
// import { useSelector } from "react-redux";
// import { Button } from "react-bootstrap";
// import { useEffect } from "react";
// import Nav from "../../common/Nav"
// import Footer from "../../common/Footer"

// function CourseInfoPage(props) {
//     let { id } = useParams();
//     // let item = props.items.find((x) => x.id == id);
//     // console.log(item);

//     const baseUrl = "http://localhost:9090";
//     const [course, setCourse] = useState([]);

    
//     useEffect(() => {
//         const getCourses = async () => {
//             const response = await axios.get(baseUrl + "/course/id");
//             console.log(id);
//             console.log(response);
//             setCourse(response);
           
//         };
//         getCourses();
//     }, []);


//     const [modal, setModal] = useState(false);

//     const [count, setCount] = useState(1);

//     function incrementCount() {
//         const newCount = count >= 5 ? 0 : count + 1;
//         setCount(newCount);
//     }
//     let navigate = useNavigate();
//     const dispatch = useDispatch();
//     let state = useSelector((state) => state);

//     const formattedPrice = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규표현식 사용

//     const formattedPrice1 = item.price1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//     return (
//         <>
//             <Nav />

//             {id}

//             {modal === true ? <CartModal modal={modal} setModal={setModal} /> : null}
//             <div className="container" id="lecture-container">
//                 <div className="lture">
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <h1 id="html-lecture">{item.title}</h1>
//                             <div id="lecture-star">
//                                 <p>
//                                     <FaStar color="#FFCB10" />
//                                     <FaStar color="#FFCB10" />
//                                     <FaStar color="#FFCB10" />
//                                     <FaStar color="#FFCB10" />
//                                     <FaStar color="#FFCB10" />
//                                     <re>( {item.rvrv} 리뷰 )</re>
//                                 </p>
//                                 {/* 별이 다섯개 */}
//                                 <li id="blackcow">
//                                     <aw>🐶</aw> {item.sugang} 수강생
//                                 </li>
//                             </div>
//                         </div>
//                         <div className="Card-lecture">
//                             <div className="Card-lecture-1">
//                                 <div className="col-sm-12">
//                                     <img src={item.image} />
//                                 </div>
//                             </div>
//                             <div className="lecture-btn-main">
//                                 <div className="col-sm-12">
//                                     <input
//                                         type="button"
//                                         id="lecture-btn"
//                                         value={"장바구니"}
//                                         onClick={() => {
//                                             const result = confirm(
//                                                 "장바구니에 상품을 담았습니다. \n장바구니로 이동하겠습니까?"
//                                             );
//                                             if (result) {
//                                                 navigate("/cart");
//                                             }
//                                             dispatch(
//                                                 addCart({
//                                                     id: item.id,
//                                                     title: item.title,
//                                                     quantity: 1,
//                                                     price: item.price,
//                                                 })
//                                             );
//                                         }}
//                                     />

//                                     <div>
//                                         <li className="price1-lecture">
//                                             현장 강의 : ₩{formattedPrice1}
//                                         </li>
//                                         <li className="pr-le">₩{formattedPrice}</li>
//                                         <hr />
//                                         <div className="pr1-lect">
//                                             <div>
//                                                 <li>365DAYS</li>
//                                             </div>
//                                             <li className="fasig-le">
//                                                 <FaSignal />
//                                             </li>
//                                         </div>
//                                         <hr />
//                                     </div>
//                                     <div className="doyou-lect">
//                                         <h3>이런 강의는 어떠세요 ?</h3>
//                                         <Link to={`/course/${count}`}>
//                                             <img src={item.image1} onClick={incrementCount} />
//                                         </Link>
//                                         <p>{item.nextTitle}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="home-lecture">
//                             <li id="hl1">홈</li> <li>게시판</li>
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="image-lecture-detail">
//                             <img src={item.detailImage} />
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="text-lecture">
//                             <p>
//                                 {" "}
//                                 표준 HTML부터 flex/grid 모던 레이아웃, Bootstrap, Sass, CSS
//                                 애니메이션 등
//                             </p>
//                             <p>
//                                 {" "}
//                                 웹페이지 디자인과 퍼블리싱에 필요한 모든 내용을 배우실 수 있습니다.
//                             </p>
//                             <p>
//                                 최근 스타트업, 대기업 등에서 적극 사용하고 있는 2020년 + 스타일
//                                 HTML과 CSS 문법을 배워가도록 합시다.
//                             </p>
//                             <p>
//                                 {" "}
//                                 꽉차보이는 포트폴리오를 만들 수 있는 여러가지 UI 예제들이
//                                 준비되어있지만
//                             </p>
//                             <p>닥치고 선생님 코드 받아적기만 하면 정말 그것밖에 못만들기 때문에</p>
//                             <p>
//                                 {" "}
//                                 여러분들이 무엇을 보든 직접 만들 수 있도록 CSS 동작 원리를 알려주는
//                                 내용들이 많습니다.
//                             </p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>{" "}
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="text-lecture">
//                             <h3> [커리큘럼 요약]</h3>
//                             <p>- HTML5 기초</p>
//                             <p>- 기본 float position display 레이아웃</p>
//                             <p>- flex/grid 등 2020스타일 레이아웃 기법</p>
//                             <p>- 최신스타일 깔끔한 코드로 만드는 반응형 웹</p>
//                             <p>- Bootstrap, font-awesome, google fonts 필수 라이브러리 사용법</p>
//                             <p>- 자바스크립트 없는 pure CSS 애니메이션</p>
//                             <p>- Sass CSS 전처리 엔진</p>
//                             <p>- 관리가능한 CSS 작성법 (아키텍처)</p>
//                             <p>- Emmet 등 생산성을 위한 툴</p>
//                             <p>- 20개 이상의 포트폴리오용 UI elements </p>
//                             <p>
//                                 - 3개의 실전 프로젝트 (반응형 랜딩페이지, SNS프로필 페이지, 통계관리
//                                 Admin 페이지)
//                             </p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="text-lecture">
//                             <h3>[필요한 사전지식]</h3>
//                             <p>{item.pztext}</p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="text-lecture">
//                             <h3>[업데이트 사항]</h3>
//                             <p> - 3D 애니메이션 강의 추가</p>
//                             <p>- 신년기념 전체강의 업데이트 끝</p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>
//                             <p>&nbsp;</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }
// export default CourseInfoPage;

// function CartModal({ modal, setModal }) {
//     return (
//         <div>
//             <h3>장바구니에 추가되었습니다 .</h3>
//             <div>
//                 <Button id="cart-lecture" onClick={() => setModal(!modal)} isPurple={true}>
//                     쇼핑 계속하기
//                 </Button>
//                 <Link to="/cart">
//                     <Button id="cart-lecture2">장바구니 보기</Button>
//                 </Link>
//             </div>
//         </div>
//     );
// }



