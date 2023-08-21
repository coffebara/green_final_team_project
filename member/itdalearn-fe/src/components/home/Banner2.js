import { useNavigate } from "react-router-dom";

export default function Banner2() {
  let navigate = useNavigate();
  return (
    <div className="bg-secondary bg-opacity-25 pb-4">
      <section className="container oberflow-hidden">
        <div className="row g-5 mt-4">
          <div className="col-sm-6 col-lg-3 ">
            <div
              className="card Border_Toggletheme"
              id="cursor"
              onClick={() => {
                navigate(`/course/5`);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/NEXTjs.png"}
                className="card-img-top"
                alt=""
              />
              <div className="card-body Text_Theme ">
                <h2 className="card-title fs-5 fw-bold ">
                  Next.js로 웹서비스 만들기
                </h2>
                <p className="card-text px-1 py-1 ">
                  Next.js는 프론트엔드부터 서버까지 만들 수 있는 React기반
                  프레임워크입니다. 이것만 사용해도 풀스택 웹개발이 가능합니다.
                  Next.js 사용시 서버사이드 렌더링이 쉽기 때문에 React, Vue만
                  ...
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div
              className="card Border_Toggletheme"
              id="cursor"
              onClick={() => {
                navigate("/course/3");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/react.png"}
                className="card-img-top"
                alt=""
              />
              <div className="card-body Text_Theme">
                <h2 className="card-title fs-5 fw-bold ">
                  React 리액트 기초부터 쇼핑몰 프로젝트까지!
                </h2>
                <p className="card-text px-1 py-1 ">
                  {" "}
                  '상태관리를 위해 객체를 부모 컴포넌트의 state로부터
                  props로 받아와서 리턴해주세요' 같은 변태 개발자용어 쓰면서
                  리액트 어렵게 설명하는 나쁜 사람....

                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div
              className="card Border_Toggletheme"
              id="cursor"
              onClick={() => {
                navigate("/course/1");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/javascript.png"}
                className="card-img-top"
                alt=""
              />
              <div className="card-body Text_Theme">
                <h2 className="card-title fs-5 fw-bold">
                  JavaScript 입문과 웹 UI개발
                </h2>
                <p className="card-text px-1 py-1">
                  {" "}
                  실제 웹 UI를 여러개 만들어보며 배워보는 JavaScript 기초 수업입니다.
                  문법만 쭉 나열하면서 가르치면 재미없어서 강의 끄고 유튜브 보러갈 것이
                  뻔하니 실무 예제 중심의 수업으로 재밌게...
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div
              className="card Border_Toggletheme"
              id="cursor"
              onClick={() => {
                navigate("/course/0");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/html&css.png"}
                className="card-img-top"
                alt=""
              />
              <div className="card-body Text_Theme">
                <h2 className="card-title fs-5 fw-bold">
                  HTML/CSS 기초 다지기
                </h2>
                <p className="card-text px-1 py-1">
                  표준 HTML부터 flex/grid 모던 레이아웃, Bootstrap, Sass, CSS 애니메이션 등
                  웹페이지 디자인과 퍼블리싱에 필요한 모든 내용을 배우실 수 있습니다.
                  최근 스타트업, 대기업 등에서 적극 ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
