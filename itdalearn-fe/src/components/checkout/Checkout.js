import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/checkout.css"
import COFormInput from "./checkoutForm/COFormInput.jsx";

function Checkout() {
    // const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const [showTermsOfUseToggle, setShowTermsOfUse] = useState(false);
    const [selectedOption, setSelectedOption] = useState("option1");
    // 이름 이메일
    const [inputValues, setInputValues] = useState({
        userName: "",
        email: "",
        tell: "",
        confirmPassword: "",
    });
    const inputs = {
        first: [
            {
                id: 1,
                name: "userName",
                title: "이름",
                type: "text",
                placeholder: "Username",
                errorMessage: "사용자 이름을 영문자로 3~16자여야하며 특수문자를 포함해서는 안됩니다.",
                pattern: "^[A-Za-z0-9ㄱ-ㅎ]{3,16}$",
                required: true,
            },
            {
                id: 2,
                name: "email",
                title: "이메일",
                type: "email",
                placeholder: "Email",
                errorMessage: "유효한 이메일 주소여야 합니다",
                required: true,
            }
        ],
        second: [
            {
                id: 3,
                name: "tell",
                title: "휴대폰 번호",
                type: "tell",
                placeholder: "tell",
                errorMessage: "올바른 휴대번호를 입력하세요.",
                pattern: "^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$",
                required: true,
            },
        ],
    }

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };
    // firebase 에서 유저 값 가져오기

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    
    const termsOfUseToggle = () => {
        setShowTermsOfUse(!showTermsOfUseToggle)
    }

    return (
        <div>
            <section id="checkout_title">
                <div className="checkout_container">
                    신청하기
                    <br />
                    Step 2. 결제
                </div>
            </section>
            <section id="checkout_content">
                <div className="checkout_container checkout_contents">
                    <form>
                    <div>
                        <p>* 무통장입금 결제시 입금확인까지 평일 영업시간 내 10~20분 소요됩니다.</p>
                        <p>
                            * <strong>영수증/수강증</strong>은 본인 이메일로 발송됩니다.
                        </p>
                    </div>
                    <div id="checkout_info">
                        <div className="checkout_info_title">
                            <h3 className="checkout_info_subtitle">신청자 정보</h3>
                            <div className="checkout_info_contents">
                            {inputs.first.map((input) => (
                                    <COFormInput title={input.title} key={input.id} {...input} value={inputValues[input.name]} onChange={handleChange} />
                                ))}
                            </div>
                        </div>
                        <div className="checkout_info_title">
                            <h3 className="checkout_info_subtitle">추가 정보</h3>
                            <div className="checkout_info_contents">
                                <ul>
                                    <li>기타사항 (선택 사항)</li>
                                    <li>
                                        <textarea name="" className="checkout_area" id="" cols="100" rows="2" placeholder=" (무통장입금시 이체자 성함 등)"></textarea>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="checkout_info_title">
                            <h3 className="checkout_info_subtitle">신청한 강좌</h3>
                            <div className="checkout_info_contents">
                                <table className="checkout_table">
                                    <thead>
                                        <tr>
                                            <th>강좌</th>
                                            <th>소계</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.cart.map((item, idx) => (
                                            <tr key={state.cart[idx].id}>
                                                <td>
                                                    {state.cart[idx].title} x {state.cart[idx].quantity}
                                                </td>
                                                <td>
                                                    <span className="checkout_price">{(state.cart[idx].price * state.cart[idx].quantity).toLocaleString()}₩</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>
                                                <strong>소계</strong>
                                            </td>
                                            <td>
                                                <span className="checkout_price checkout_total">{state.checkout.subTotal.toLocaleString()}₩</span>
                                            </td>
                                        </tr>
                                        {state.checkout.discount !== 1 ? (
                                            <tr>
                                                <td>
                                                    <strong>할인</strong>
                                                </td>
                                                <td>
                                                    <span className="checkout_price checkout_total">-{(state.checkout.subTotal * (1 - state.checkout.discount)).toLocaleString()}₩</span>
                                                </td>
                                            </tr>
                                        ) : null}
                                        <tr>
                                            <td>
                                                <strong>총계</strong>
                                            </td>
                                            <td>
                                                <span className="checkout_price checkout_total">{(state.checkout.subTotal * state.checkout.discount).toLocaleString()}₩</span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div id="payment_box">
                                    <div className="payment_method">
                                        <ul>
                                            <li>
                                                <input onChange={handleOptionChange} checked={selectedOption === "option1"} value="option1" type="radio" name="checkout_payment" id="checkout_atm" />
                                                <label htmlFor="checkout_atm">무통장입금</label>
                                                <div className={`payment_method_explain ${selectedOption === "option1" ? "show" : ""}`}>
                                                    <p>상단에 입금하시는 분 성함을 입력해주세요! 입금확인까지 평일은 영업시간내 10분~20분 정도 소요됩니다.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <input
                                                    onChange={handleOptionChange}
                                                    checked={selectedOption === "option2"}
                                                    value="option2"
                                                    type="radio"
                                                    name="checkout_payment"
                                                    id="checkout_acountAtm"
                                                />
                                                <label htmlFor="checkout_acountAtm">무통장입금 (가상계좌생성)</label>
                                                <div className={`payment_method_explain ${selectedOption === "option2" ? "show" : ""}`}>
                                                    <p>가상계좌로 입금하실 수 있습니다. (10분 내 자동 입금확인)</p>
                                                </div>
                                            </li>
                                            <li>
                                                <input onChange={handleOptionChange} checked={selectedOption === "option3"} value="option3" type="radio" name="checkout_payment" id="checkout_credit" />
                                                <label htmlFor="checkout_credit">신용카드 결제</label>
                                                <div className={`payment_method_explain ${selectedOption === "option3" ? "show" : ""}`}>
                                                    <p>신용/체크카드로 결제하실 수 있습니다.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <input
                                                    onChange={handleOptionChange}
                                                    checked={selectedOption === "option4"}
                                                    value="option4"
                                                    type="radio"
                                                    name="checkout_payment"
                                                    id="checkout_rtAcount"
                                                />
                                                <label htmlFor="checkout_rtAcount">실시간계좌 이체</label>
                                                <div className={`payment_method_explain ${selectedOption === "option4" ? "show" : ""}`}>
                                                    <p>실시간계좌이체로 결제하실 수 있습니다.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="payment_agreement">
                                        
                                        <div>
                                            <p>
                                                입력하신 개인정보는 사이트내에서 이용할 예정이며{" "}
                                                <span className="payment_agreement_span" onClick={() => navigate("/privacy-policy")}>
                                                    개인정보 보호정책
                                                </span>
                                                을(를) 준수하고 있습니다.
                                            </p>
                                        </div>
                                        <p id="payment_mustCheck">
                                            <div className="payment_TermsOfUse" style={{display: showTermsOfUseToggle ? "block" : "none"}}>
                                            <p>제1조(목적)</p>

                                            <p>표준약관 제10023호</p>

<p>이 약관은 사업자명 슈퍼로켓에듀케이션(전자거래 사업자)가 운영하는 코딩애플 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
<br/>※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는한 이 약관을 준용합니다」
</p>
<p>제2조(정의)</p>

<br/>① "몰"이란 슈퍼로켓 에듀케이션 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
<br/>② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
<br/>③ ‘회원’이라 함은 "몰"에 개인정보를 제공하여 회원등록을 한 자로서, "몰"의 정보를 지속적으로 제공받으며, "몰"이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
<br/>④ ‘비회원’이라 함은 회원에 가입하지 않고 "몰"이 제공하는 서비스를 이용하는 자를 말합니다.

<p>제3조(약관등의 명시와 설명 및 개정)</p>

<br/>① "몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보 보호책임자등을 이용자가 쉽게 알 수 있도록 "몰"의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
<br/>② "몰"은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
<br/>③ "몰"은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
<br/>④ "몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일이전부터 적용일자 전일까지 공지합니다.
다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "몰“은 개정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
<br/>⑤ "몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간내에 "몰"에 송신하여 "몰"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
<br/>⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
                                            </div>
                                            <input type="checkbox" required/>
                                            본인은 웹사이트 <span className="payment_agreement_span" onClick={() =>termsOfUseToggle()}>이용 약관</span>을(를) 읽었으며 이에 동의합니다.{" "}
                                        </p>
                                        <input className="cart_redBtn" type="submit" value="결제하기" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        </form>
                </div>
            </section>
        </div>
    );
}

<table>
    <tr>
        <td>1번</td>
        <td>2번</td>
    </tr>
</table>;

export default Checkout;
