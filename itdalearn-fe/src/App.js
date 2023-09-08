import "./App.css";
import "./styles/Nav.css";
import "./styles/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage.js";
import CartPage from "./pages/CartPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage.js";
import CourseInfoPage from "./pages/CourseInfoPage";
import TermsOfUse from "./components/checkout/TermsOfUse";
import Admin_CoursePage from "./pages/Admin_CoursePage";
import Admin_CourseWritePage from "./pages/Admin_CourseWritePage";
import Admin_CourseDetailPage from "./pages/Admin_CourseDetailPage";
import Member_SignUpPage from "./pages/Member_SignUpPage";
import CourseListPage from "./pages/CourseListPage";
import MyPage from "./pages/MyPage";
import OrdersPage from "./pages/OrdersPage";
import Member_SignInPage from "./pages/Member_SignInPage.js";
// import Member_FindIdPage from "./pages/Member_FindIdPage.js";
// import Member_MyPage_CheckPage from "./pages/Member_MyPage_CheckPage.js";
// import Member_MyPage from "./pages/Member_MyPage";
import Payment from "./components/order/Payment";
import BoardListComponent from './pages/BoardListPage';
import BoardCreateComponent from './pages/BoardCreatePage';
import BoardReadComponent from './pages/BoardReadPage';
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<div>잘못된 경로입니다.</div>} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/board" element={<BoardListComponent />} />
        <Route path="/board/write/:bno" element={<BoardCreateComponent />} />
        <Route path="/board/detail/:bno" element={<BoardReadComponent />} />

        <Route path="/courselist" element={<CourseListPage />} />
        <Route path="/course/:id" element={<CourseInfoPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/admin/courses" element={<Admin_CoursePage />} />
        <Route path="/admin/course" element={<Admin_CourseWritePage />} />
        <Route path="/admin/course/:id" element={<Admin_CourseDetailPage />} />

        <Route path="/members/login" element={<Member_SignInPage />} />
        <Route path="/members" element={<Member_SignUpPage />} />
        {/* <Route path="/members/find/id" element={<Member_FindIdPage />} />
        <Route
          path="/members/mypage/check"
          element={<Member_MyPage_CheckPage />}
        />
        <Route path="/members/mypage" element={<Member_MyPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
