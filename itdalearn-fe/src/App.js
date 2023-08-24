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
        <Route path="/course" element={<CoursePage />} />
        <Route path="/course/:id" element={<CourseInfoPage items={items} />} />
        <Route path="/board" element={<BoardFreeList />} />
        <Route path="/board/:idx" element={<BoardFreeDetailPage />} />
        <Route path="/write" element={<BoardFreeWritePage />} />
        <Route path="/update/:idx" element={<BoardFreeUpdate />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/*" element={<div>잘못된 경로입니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;