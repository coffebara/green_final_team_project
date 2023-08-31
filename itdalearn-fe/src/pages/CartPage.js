import Cart from "../components/cart/Cart";
import CartRefresh from "../components/cart/CartRefresh";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import CartList from "../components/cart/CartList"

export default function CartPage() {

    CartRefresh();

    return (
        <>
            <Nav />
            <CartList/>
            <Footer />
        </>
    );
}
