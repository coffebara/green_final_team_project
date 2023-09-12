import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setRoles } from "../store"

export default function NavSetting() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let state = useSelector((state) => state);
    function clearStorage() {
        let session = sessionStorage.getItem("register");
    
        if (session == null) {
          localStorage.removeItem("token");
        }
        sessionStorage.setItem("register", 1);
      }



      window.addEventListener("load", clearStorage);

    const imageStyle = {
        width: 100,
        height: 25,
    };

  const [isLoggedIn, setIsLoggedIn] = useState(clearStorage);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        dispatch(setRoles(""));
        setIsLoggedIn(false);
        alert("로그아웃 되셨습니다.");
        navigate("/");
    }
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Nav.Link
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <img src={process.env.PUBLIC_URL + "/favicon.ico"} style={imageStyle} />
                    </Nav.Link>
                    <Nav>
                        <Nav.Link
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            강의
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate("/board");
                            }}
                        >
                            게시판
                        </Nav.Link>
                        {!isLoggedIn ? (
                            <Nav.Link
                                onClick={() => {
                                    navigate("/members/login");
                                }}
                            >
                                로그인
                            </Nav.Link>
                        ) : (
                            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                        )}
                        <Nav.Link
                            onClick={() => {
                                navigate("/cart");
                            }}
                        >
                            장바구니
                            <Badge className="ms-2" bg="secondary">
                                {state.cart.length}
                            </Badge>
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => {
                                navigate("/mypage");
                            }}
                        >
                            MyPage
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {useSelector((state) => state.userRoles[0]) === "ROLE_ADMIN" ? (
                <>
                    <Navbar bg="warning" sticky="top">
                        <Container>
                            <Navbar.Brand>관리자 메뉴</Navbar.Brand>
                            <Nav>
                                <Nav.Link
                                    onClick={() => {
                                        navigate("/admin/courses");
                                    }}
                                >
                                    강의 관리
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate("/admin/course")}>
                                    강의 등록
                                </Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
