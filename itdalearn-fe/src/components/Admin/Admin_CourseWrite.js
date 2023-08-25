import axios from "axios";
import { useState } from "react";
import "../../styles/Admin_Course.css";
import { useNavigate } from "react-router-dom";

export default function Admin_CourseWrite() {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:9090";
    const courseLevels = ["HIGH", "MID", "LOW"];
    const courseCategories = ["BE", "FE"];
    const [inputs, setInputs] = useState({
        courseTitle: "",
        courseTeacher: "",
        courseDec: "",
        coursePrice: "",
        courseLevel: courseLevels[0],
        courseCategory: courseCategories[0]
    });
    
    // 백으로 전송
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }

        await axios.post(baseUrl + "/admin/course", formData).then((res) => {
            if(res.status === 200) {
                window.alert("강의가 등록되었습니다.");
                navigate(-1);
            }
        }).catch(function (err){
            window.alert("강의 등록이 실패하였습니다. "+err);
        })
    };

    // useState에 입력값 받기
    const handleOnChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>강의명</label>
                <input type="text" name="courseTitle" onChange={handleOnChange} />
            </div>
            <div>
                <label>강사</label>
                <input type="text" name="courseTeacher" onChange={handleOnChange} />
            </div>
            <div>
                <label>가격</label>
                <input type="text" name="coursePrice" onChange={handleOnChange} />
            </div>
            <div>
                <label>설명</label>
                <input type="text" name="courseDec" onChange={handleOnChange} />
            </div>
            <div>
                <label>레벨</label>
                <select name="courseLevel">
                    {courseLevels.map((level, i) => (
                        <option key={i} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>카테고리</label>
                <select name="courseCategory">
                    {courseCategories.map((category, i) => (
                        <option key={i} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">등록하기</button>
            <button onClick={() => navigate('/admin/courses')}>취소하기</button>
        </form>
    );
};