import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {refreshCart} from "../../store.js"


export default function CartRefresh() {
    const dispatch = useDispatch();
    useEffect(() => {
        const cartSession = sessionStorage.getItem("cart")?  JSON.parse(sessionStorage.getItem("cart")) : null
        
        if (cartSession) {
            dispatch(refreshCart(cartSession));
        }
    }, []);
}
