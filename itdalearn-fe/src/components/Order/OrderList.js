import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
    const baseUrl = "http://localhost:9090";
    const [courses, setCourses] = useState([]);

    
    useEffect(() => {
        const getCourses = async () => {
            const response = await axios.get(baseUrl +"/orders");
            console.log(response)
            setCourses(response.data.orders);
            console.log(response.data.orders.orderCourseDtoList);
          
        };
        getCourses();
    }, []);

    return (
                <>
                    <h2>강의 리스트</h2>
                    <OrderListTable courses={courses} />
                </>
    );
}

const OrderListTable = ({ courses }) => {

    let navigate = useNavigate();
    return (
        <table className="courseListTable">
            <thead>
                <tr>
                    <th>강의번호</th>
                    <th>강의명</th>
                    <th>가격</th>
                    <th>구매날짜</th>
                    <th>구매상태</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((item, i) => (
                    <tr key={i}>
                        <td>{item.orderNo}</td>
                        <td>{item.orderCourseDtoList[0].courseTitle}</td>
                        <td>{item.orderCourseDtoList[0].coursePrice}</td>
                        <td>{item.orderDate}</td>
                        <td>{item.orderStatus}</td>
                        <button onClick={() => {
                        navigate(`/course/${item.courseNo}`);
                    }}>주문 취소</button>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
