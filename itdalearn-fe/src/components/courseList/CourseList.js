import "../../styles/CartList.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseList() {
    const baseUrl = "http://localhost:9090";
    const [courses, setCourses] = useState([]);

    
    useEffect(() => {
        const getCourses = async () => {
            const response = await axios.get(baseUrl + "/courses");
            console.log(response);
            setCourses(response.data.courseList);
            console.log(courses);
        };
        getCourses();
    }, []);

    return (
                <>
                    <h2>강의 리스트</h2>
                    <CourseListTable courses={courses} />
                </>
    );
}

const CourseListTable = ({ courses }) => {

    let navigate = useNavigate();
    return (
        <table className="courseListTable">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>강의 명</th>
                    <th>강사</th>
                    <th>가격</th>
                    <th>설명</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((item, i) => (
                    <tr key={i}>
                        <td>{item.courseNo}</td>
                        <td>{item.courseTitle}</td>
                        <td>{item.courseTeacher}</td>
                        <td>{item.coursePrice}</td>
                        <td>{item.courseDec}</td>
                        <button onClick={() => {
                        navigate(`/course/${item.courseNo}`);
                    }}>상세보기</button>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

