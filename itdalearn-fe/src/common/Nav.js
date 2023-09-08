import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
    </>
  );
}
