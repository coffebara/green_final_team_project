import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store";

export const ThemeContext = createContext(null);

export default function Nav_setting() {
  //여기서부터
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let state = useSelector((state) => state);

  function handleLogout() {
    dispatch(logout());
  }

  const imageStyle = {
    width: 100,
    height: 25,
  };

  return (
    <div className="Nav_Theme">
      <Navbar>
        <Container>
          <Nav.Link
            onClick={() => {
              navigate("/");
            }}
            className="Nav_Toggletheme"
          >
            <img
              src={process.env.PUBLIC_URL + "/favicon.ico"}
              style={imageStyle}
            />
          </Nav.Link>

          <Nav>
            <Nav.Link
              onClick={() => {
                navigate("/class");
              }}
              className="Nav_Toggletheme"
            >
              강의
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/reference");
              }}
              className="Nav_Toggletheme"
            >
              레퍼런스
            </Nav.Link>
            {!state.login.isLogin ? (
              <Nav.Link
                onClick={() => navigate("/login")}
                className="Nav_Toggletheme"
              >
                로그인
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => handleLogout()}
                className="Nav_Toggletheme"
              >
                로그아웃
              </Nav.Link>
            )}

            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
              className="Nav_Toggletheme"
            >
              장바구니
              <Badge className="ms-2" bg="secondary">
                {state.cart.length}
              </Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
