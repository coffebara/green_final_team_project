import Cart from "../components/cart/Cart";
import CartRefresh from "../components/cart/CartRefresh";
import Nav from "../common/Nav";
import Footer from "../common/Footer";

export default function CartPage() {

    CartRefresh();

    return (
        <>
            <Nav />
            <Cart />
            <Footer />
        </>
    );
}
