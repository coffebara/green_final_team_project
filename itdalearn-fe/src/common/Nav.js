import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function NavSetting() {

  
  let navigate = useNavigate();
  let state = useSelector((state) => state);

  const imageStyle = {
    width: 100,
    height: 25,
  };

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
                navigate("/course");
              }}
            >
              강의
            </Nav.Link>

            <Nav.Link
              onClick={() => {

                navigate("/board");

                alert("게시판 연결시켜주세요~")

              }}
            >
              게시판
            </Nav.Link>
            {!state.login.isLogin ? (
              <Nav.Link
                onClick={() => alert("로그인 연결시켜주세요~")}
              >
                로그인
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => alert("로그아웃 연결시켜주세요~")}
              >
                로그아웃
              </Nav.Link>
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
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
