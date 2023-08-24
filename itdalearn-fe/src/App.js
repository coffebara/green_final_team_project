import "./App.css";
import "./styles/Nav.css";
import "./styles/Banner.css";
import "./styles/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage.js";
import CartPage from "./pages/CartPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage.js";
import CheckoutPage from "./pages/CheckoutPage.js";
import CoursePage from "./pages/CoursePage";
import CourseInfoPage from "./pages/CourseInfoPage";
import data from "./common/data.js";
import { Routes, Route } from "react-router-dom";
import TermsOfUse from "./components/checkout/TermsOfUse";
import Admin_CoursePage from "./pages/Admin_CoursePage"
import Admin_CourseWritePage from "./pages/Admin_CourseWritePage"
import Admin_CourseDetailPage from "./pages/Admin_CourseDetailPage"
import Member_SignUpPage from "./pages/Member_SignUpPage";
import CourseListPage from "./pages/CourseListPage"
import CartList from "./components/cart/CartList"
import OrderPage from "./pages/OrderPage";
import OrderListPage from "./pages/OrderListPage";


import BoardFreeList from "./pages/BoardFreeList";
import BoardFreeDetailPage from "./pages/BoardFreeDetailPage";
import BoardFreeWritePage from "./pages/BoardFreeWritePage";
import BoardFreeUpdate from "./pages/BoardFreeUpdate";
import React from "react";

function App() {
  // 디테일 페이지 용
  const items = data;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* 메인화면 _ 특정 강의 몇개만 보여지는 화면 */}
        <Route path="/course" element={<CoursePage />} />

        <Route path="/board" element={<BoardFreeList />} />
        <Route path="/board/:idx" element={<BoardFreeDetailPage />} />
        <Route path="/write" element={<BoardFreeWritePage />} />
        <Route path="/update/:idx" element={<BoardFreeUpdate />} />

        <Route path="/courselist" element={<CourseListPage />} />
        <Route path="/course/:id" element={<CourseInfoPage />} /> 
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/*" element={<div>잘못된 경로입니다.</div>} />

        <Route path="/admin/courses" element={<Admin_CoursePage/>} />
        <Route path="/admin/course" element={<Admin_CourseWritePage/>}/>
        <Route path="/admin/course/:id" element={<Admin_CourseDetailPage/>}/>
        <Route path="/signup" element={<Member_SignUpPage />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orderList" element={<OrderListPage />} />

      </Routes>
    </div>
  );
}

export default App;