import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Admin_Course.css";
import { useNavigate } from "react-router-dom";

export default function Admin_Course() {
    const baseUrl = "http://localhost:9090";
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const courseLevels = ["HIGH", "MID", "LOW"];
    const courseCategories = ["BE", "FE"];
    const [inputs, setInputs] = useState({
        course_title: "",
        course_teacher: "",
        course_dec: "",
        course_price: "",
        course_level: courseLevels[0],
        course_category: courseCategories[0]
    });

    useEffect(() => {
        const getCourses = async () => {
            const response = await axios.get(baseUrl + "/admin/courses");
            setCourses(response.data.courseList);
            console.log(courses)
        };

        getCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }
        await axios.post(baseUrl + "/admin/course", formData).then(function (res) {
            if(res.status === 200) {
                window.alert("전송 성공");
                setShowForm((toggle) => !toggle)
            }
        }).catch(function (err){
            window.alert("실패 "+err);
        })
    };

    const handleOnChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            {showForm === false ? (
                <>
                    <h2>강의 리스트</h2>
                    <button
                        className="courseListBtn"
                        onClick={() => setShowForm((toggle) => !toggle)}
                    >
                        강의 등록
                    </button>
                    <CourseListTable courses={courses} />
                </>
            ) : (
                <>
                    <h2>강의 등록하기</h2>
                    <CourseForm handleSubmit={handleSubmit} handleOnChange={handleOnChange} courseLevels ={courseLevels} courseCategories={courseCategories}/>
                    <button type="button" onClick={() => setShowForm((toggle) => !toggle)}>
                        취소하기
                    </button>
                </>
            )}
        </div>
    );
}

const CourseListTable = ({ courses }) => {
    return (
        <table className="courseListTable">
            <thead>
                <tr>
                    <th>강의 명</th>
                    <th>강사</th>
                    <th>가격</th>
                    <th>설명</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((item, i) => (
                    <tr key={i}>
                        <td>{item.course_title}</td>
                        <td>{item.course_teacher}</td>
                        <td>{item.course_price}</td>
                        <td>{item.course_dec}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const CourseForm = ({ handleSubmit, handleOnChange, courseLevels, courseCategories }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>강의명</label>
                <input type="text" name="course_title" onChange={handleOnChange} />
            </div>
            <div>
                <label>강사</label>
                <input type="text" name="course_teacher" onChange={handleOnChange} />
            </div>
            <div>
                <label>가격</label>
                <input type="text" name="course_price" onChange={handleOnChange} />
            </div>
            <div>
                <label>설명</label>
                <input type="text" name="course_dec" onChange={handleOnChange} />
            </div>
            <div>
                <label>레벨</label>
                <select name="course_level">
                    {courseLevels.map((level, i) => (
                        <option key={i} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>카테고리</label>
                <select name="course_category">
                    {courseCategories.map((category, i) => (
                        <option key={i} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">등록하기</button>
        </form>
    );
};
