import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/cart.css";
import { updateQuantity, removeCart, getDiscount, getTotalSum } from "../../store";
import { Button, Modal } from "react-bootstrap";

function Cart() {
    
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let state = useSelector((state) => state);
    const [modalShow, setModalShow] = useState(false);
    const [totalSum, setTotalSum] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [couponAlert, setCouponAlert] = useState(true);

    const getTotalPrice = () => {
        setTotalSum(state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
        dispatch(getTotalSum(totalSum));
    };
    let discount = 1;

    // 총계가 마운트 될 때 바로 보이고, 수량변경마다 업데이트 시키는 함수
    useEffect(() => {
        getTotalPrice();
    }, [state]);

    const removeCartItem = (id) => {
        dispatch(removeCart(id));
    };

    useEffect(() => {
        let couponEvent = setTimeout(() => {
            setCouponAlert(false);
        }, 2000);
        return () => {
            clearTimeout(couponEvent);
        };
    }, []);

    const checkCoupon = () => {
        const cartCouponCode = "a";
        if (couponCode === cartCouponCode) {
            alert(`${couponCode} 20% 쿠폰이 적용됩니다.`);
            discount = 0.8;
            dispatch(getDiscount(discount));
        } else if (couponCode === "") {
            alert("다시 입력해");
        } else {
            alert(`"${couponCode}"는 유효하지 않은 쿠폰입니다`);
        }
        setCouponCode("");
    };

    // store를 통한 수량변경
    const changeCount = (e, i) => {
        const newQuantity = e.target.value < 0 ? 0 : e.target.value;
        dispatch(updateQuantity({ newQuantity, i }));
    };

    return (
        <div>
            {/* <Nav /> */}
            <section id="cart_title">
                <div className="cart_container">
                    신청하기
                    <br />
                    Step 1. 강의 선택
                </div>
            </section>
            {/* 모달 시작 */}
            <Modal show={modalShow} backdrop="static" size="s" aria-labelledby="contained-modal-title-vcenter" centered>
            <div>
            <Modal.Body>
                <h4>로그인이 필요합니다.</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="cart_redBtn" variant="outline-secondary"
                    onClick={() => setModalShow(false)}>
                    나가기
                </Button>
                <Button
                    className="cart_redBtn" variant="outline-danger"
                    onClick={() =>
                        navigate("/checkout", {
                            state: {
                                prevPage: "/checkout",
                            },
                        })
                    }
                >
                    
                    로그인 하기
                </Button>
            </Modal.Footer>
            </div>
        </Modal>
            {/* 깜짝 쿠폰 */}
            {couponAlert === true && state.cart.length  ?  (
                <div onClick={() => alert("쿠폰 코드: a")} className="alert alert-warning">
                    🎊🎊 깜짝 쿠폰 🎊🎊
                    <br /> 2초 내 클릭 시 쿠폰 코드 지급
                </div>
            ) : null}

            <section id="cart_content">
                <div className="cart_container cart_gridContainer">
                    <div className="cart_list">
                        {/* 장바구니 아이템 유무에 따른 장바구니 출력 설계 */}
                        {!state.cart.length ? (
                            <div className="no_contents">
                                <div>
                                    <p>❗ 고객님의 장바구니가 현재 비어있습니다.</p>
                                </div>
                                <p>
                                    <input
                                        className="cart_redBtn"
                                        type="button"
                                        onClick={() => {
                                            navigate("/class");
                                        }}
                                        value="상점으로 돌아가기"
                                    />
                                </p>
                            </div>
                        ) : (
                            <form method="post">
                                <table className="cart_table">
                                    <thead id="cart_thead">
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>강좌</th>
                                            <th>가격</th>
                                            <th>기간 (년)</th>
                                            <th>총합</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* 장바구니 리스트 출력 시작 */}
                                        {state.cart.map((a, i) => (
                                            <tr key={state.cart[i].id}>
                                                <td>
                                                    <span className="cart_cancelBtn" onClick={() => removeCartItem(a.id)}>
                                                        X
                                                    </span>
                                                </td>
                                                <td>{state.cart[i].title}</td>
                                                <td className="cart_price">{state.cart[i].price?.toLocaleString()}₩</td>
                                                <td>
                                                    <input onChange={(e) => changeCount(e, i)} className="cart_input" type="number" value={state.cart[i].quantity} />
                                                </td>
                                                <td className="cart_price">{(state.cart[i].price * state.cart[i].quantity).toLocaleString()}₩</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td id="cart_btn" colSpan="5">
                                                <div>
                                                    <input onChange={(e) => setCouponCode(e.target.value)} value={couponCode} className="cart_coupon" type="text" placeholder="쿠폰 코드" />
                                                    <input onClick={checkCoupon} id="cart_coupon_btn" type="button" value="쿠폰 적용하기" />
                                                    {/* <input type="button"value="계산하기" onClick={getTotalPrice}/> */}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        )}
                    </div>
                    {state.cart.length ? (
                        <div className="cart_total">
                            <div>
                                <h4>신청할 강좌 합계</h4>
                            </div>
                            <table className="cart_table total_table">
                                <tbody>
                                    <tr className="Cart_table_form">
                                        <td >소계</td>
                                        <td style={state.checkout.discount !== 1 ? { textDecoration: "line-through" } : null} className="total_price">
                                            {totalSum.toLocaleString()}₩
                                        </td>
                                    </tr>
                                    {state.checkout.discount !== 1 ? (
                                        <tr className="Cart_table_form">
                                            <td>쿠폰 할인 (20%)</td>
                                            <td className="coupon_discount">-{(totalSum * (1 - state.checkout.discount)).toLocaleString()}₩</td>
                                        </tr>
                                    ) : null}
                                    <tr className="Cart_table_form cart_total_price_border">
                                        <td>총계</td>
                                        <td className="total_price">{(totalSum * state.checkout.discount).toLocaleString()}₩</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                {/* 결제페이지 이동 */}
                                <input
                                    onClick={() => {
                                        {
                                            // navigate("/checkout") 
                                            setModalShow(true);
                                        }
                                        getTotalPrice();
                                    }}
                                    id="cart_process_btn"
                                    type="button"
                                    value="결제 진행하기"
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default Cart;
