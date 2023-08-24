package com.itdaLearn.constant;

public enum OrderStatus {
    ORDER, CANCEL
}//주문의 상태를 나타내는 열거형(enum)입니다
//양방향 매핑이란 단방향 매핑이 2개 있다고 생각하시면 됩니다
//현재는 장바구니 상품 엔티티가 장바구니를 참조하는 단방향 매핑입니다
//주문상태와 취소상태 두가지가 있습니다