import { configureStore, createSlice } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice"

let userRoles = createSlice({
    name: "userRoles",
    initialState: "",
    reducers: {
        setRoles(state, action) {
            return action.payload;
        }
    }
})



let cart = createSlice({
    name: "cart",
    initialState: [
        // { id: 50, title: "하이", quantity: 1, price: 100 },
        // { id: 11, title: "바이", quantity: 1, price: 200 },
    ],
    reducers: {
        addCart(state, action) {
            let itemId = state.findIndex((item) => action.payload.id === item.id);
            itemId !== -1 ? state[itemId].quantity++ : state.push(action.payload);
            let jsonString = JSON.stringify(state);
            sessionStorage.setItem("cart", jsonString);
        },
        removeCart(state, action) {
            let newState = state.filter((item) => item.id !== Number(action.payload));
            let jsonString = JSON.stringify(newState);
            sessionStorage.setItem("cart", jsonString);
            return newState;
        },
        updateQuantity(state, action) {
            const { newQuantity, i } = action.payload;
            state[i].quantity = newQuantity;
        },
        refreshCart(state, action) {
            console.log("기존 state 값: " + state);
            if (action.payload && state.length === 0) {
                state.push(action.payload);
            }
            console.log("세션에서 가져와야하는 값: " + action.payload);
            console.log("최종 state: " + state);
        // },
        // refreshCart(state, action) {
        //     console.log("기존 state 값: " + state);
        //     if (action.payload && state.length === 0) {
        //         for (let i = 0; i < action.payload.length; i++) {
        //             state.push(action.payload[i]);
        //         }
        //     }
            // console.log("세션에서 가져와야하는 값: " + action.payload);
            // console.log("최종 state: " + state);
            // state.map((item) => {console.log(item)});
        },
    },
});

let checkout = createSlice({
    name: "checkout",
    initialState: { subTotal: 0, discount: 1 },
    reducers: {
        getDiscount(state, action) {
            let newDiscount = action.payload;
            state.discount = newDiscount;
        },
        getTotalSum(state, action) {
            let newTotalSum = action.payload;
            state.subTotal = newTotalSum;
            console.log(state.subTotal);
        },
    },
});

let login = createSlice({
    name: "login",
    initialState: { isLogin: false },
    reducers: {
        loginToggle(state, action) {
            console.log("기본값: " + state.isLogin);
            state.isLogin = action.payload;
            console.log(" 변경 값: " + action.payload);
        },
        logout(state) {
            state.isLogin = false;
            console.log("로그아웃 되었습니다.");
        },
    },
});

const store = configureStore({
    reducer: {
        items: itemReducer,
        cart: cart.reducer,
        checkout: checkout.reducer,
        login: login.reducer,
        userRoles: userRoles.reducer,
    },
});

export let { addCart, removeCart, updateQuantity, refreshCart } = cart.actions;
export let { getDiscount, getTotalSum } = checkout.actions;
export let { loginToggle, logout } = login.actions;
export let { setRoles } = userRoles.actions;

export default store;
