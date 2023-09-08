import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavSetting() {
  let navigate = useNavigate();
  let state = useSelector((state) => state);

    const imageStyle = {
        width: 100,
        height: 25,
    };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("로그아웃 되셨습니다.");
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
            <img
              src={process.env.PUBLIC_URL + "/favicon.ico"}
              style={imageStyle}
            />
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
                        {!state.login.isLogin ? (
                            <Nav.Link
                                onClick={() => {
                                    navigate("/members/login");
                                }}
                            >
                                로그인
                            </Nav.Link>
                        ) : (
                            <Nav.Link>로그아웃</Nav.Link>
                        )}
                        <Nav.Link
                            onClick={() =>
                                axios
                                    .post("http://localhost:9090/logout")
                                    .catch((error) => console.log(error))
                            }
                        >
                            로그아웃
                        </Nav.Link>

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
                                <Nav.Link onClick={() => {navigate("/admin/courses")}}>
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
            <Nav.Link
              onClick={() => axios.post("http://localhost:9090/logout").catch(error => console.log(error))  }
            >
              로그아웃
            </Nav.Link>
           
         


            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}>장바구니
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
    </>
  );
}
