import { useNavigate } from "react-router-dom";

export default function Footer() {
  let navigate = useNavigate();

  return (
    <div className="Nav_Theme">
      <div className="container">
        <div id="Footer_setting">
          <div id="Footer_ul_detail_setting">
            <ul id="Footer_list_style">
              <li>
                <span id="Footer_span" className="Nav_Toggletheme">
                  ABOUT US
                </span>
              </li>
              <li id="Cursor_left" className="Nav_Toggletheme">
                IT-DA
              </li>
              <li id="Cursor_left" className="Nav_Toggletheme">
                팀장: 김상준
              </li>
              <li id="Cursor_left" className="Nav_Toggletheme">
                팀원: 권혜연, 지성현, 김현승
              </li>
              <li id="Cursor_left" className="Nav_Toggletheme">
                이메일: greensn7447@gmail.com
              </li>
              <li id="Cursor_left" className="Nav_Toggletheme">
                주소: 경기도 성남시 분당구 돌마로 46 (광천빌딩 5층)
              </li>
              <li id="Cursor_left" className="Nav_Toggletheme">
                대표번호 : 031-712-7447
              </li>
            </ul>
          </div>
          <div id="Footer_ul_setting">
            <ul id="Footer_list_style">
              <li>
                <span id="Footer_span" className="Nav_Toggletheme">
                  NAVIGATION
                </span>
              </li>
              <li
                onClick={() => {
                  navigate("/");
                }}
                id="Cursor"
                className="Nav_Toggletheme"
              >
                강의
              </li>
              <li
                onClick={() => {
                  navigate("/board");
                }}
                id="Cursor"
                className="Nav_Toggletheme"
              >
                게시판
              </li>
              <li
                onClick={() => {
                  navigate("/members/login");
                }}
                id="Cursor"
                className="Nav_Toggletheme"
              >
                로그인
              </li>
            </ul>
          </div>
          <div id="Footer_ul_setting">
            <ul id="Footer_list_style">
              <li>
                <span id="Footer_span" className="Nav_Toggletheme">
                  LEGAL
                </span>
              </li>
              <li id="Cursor" className="Nav_Toggletheme">
                FAQ
              </li>
              <li
                onClick={() => {
                  navigate("/terms");
                }}
                id="Cursor"
                className="Nav_Toggletheme"
              >
                이용약관
              </li>
              <li
                onClick={() => {
                  navigate("/privacy-policy");
                }}
                id="Cursor"
                className="Nav_Toggletheme"
              >
                개인정보취급방안
              </li>
              <li id="Cursor" className="Nav_Toggletheme">
                취소 및 환불정책
              </li>
            </ul>
          </div>
          <div id="Footer_ul_setting">
            <ul id="Footer_list_style">
              
              <li>
                <a href="https://github.com/coffebara/green_final_team_project.git" target="_blank">
                  <img
                    src={process.env.PUBLIC_URL + "/github.png"}
                    id="Footer_img2"
                  ></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
