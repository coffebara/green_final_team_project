import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Admin_Course.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export default function Admin_CourseDetail() {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:9090";
    const { id } = useParams();
    const [isModalShow, setIsModalShow] = useState(false);
    const courseLevels = ["HIGH", "MID", "LOW"];
    const courseCategories = ["BE", "FE"];
    const [courseDetails, setCourseDetails] = useState({
        courseNo: "",
        courseTitle: "",
        courseTeacher: "",
        courseDec: "",
        coursePrice: "",
        courseLevel: courseLevels[0],
        courseCategory: courseCategories[0]
    });
    const [isUpdatable, setIsUpdatable] = useState(false);

    //--------------강의 정보 가져오기
    useEffect(() => {
        const getCourseDetails = async () => {
            try{
                const response = await axios.get(baseUrl + "/admin/course/" + id);
                setCourseDetails(response.data.courseFormDto);
            } catch (error) {
                console.log(error);
            }
            // await axios.get(baseUrl + "/admin/course/" + id).then((res) => {
            //     setCourseDetails(res.data.courseFormDto);
            // });
        };
        getCourseDetails();
    }, []);

    //---------------강의 수정하기
    
    // useState에 입력값 받기
    const handleOnChange = (e) => {
        setCourseDetails({
            ...courseDetails,
            [e.target.name]: e.target.value,
        });
    };

     // 백으로 전송
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in courseDetails) {
            formData.append(key, courseDetails[key]);
        }
        await axios.patch(baseUrl + "/admin/course/" + id, formData)
        .then(response =>{
            console.log(response)
        }).catch(error => {
            if(error.response.status === 302) {
                window.alert("강의가 수정되었습니다.");
                navigate(-1);
            }
        })
    };


    //---------------강의 삭제하기
    const handleDeleteCourse = () => {
        setIsModalShow(false);
        axios.delete(baseUrl + "/admin/course/" + id)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            if(error.response.status === 302) {
                navigate('/admin/courses')
            } 
        });
        
    };
    const handleModal = (e) => {
        e.preventDefault();
        setIsModalShow(true);
    }

    //수정
    const handleUpdate = (e) => {
        e.preventDefault();
        setIsUpdatable(true);
    }
    return (
        <div>
            {/* 모달 시작 */}
            <Modal
                show={isModalShow}
                backdrop="static"
                size="s"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <div>
                    <Modal.Body>
                        <h4>해당 코스를 삭제하시겠습니까?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="cart_redBtn"
                            variant="outline-secondary"
                            onClick={() => setIsModalShow(false)}>
                            취소
                        </Button>
                        <Button
                            className="cart_redBtn"
                            variant="outline-danger"
                            onClick={() => handleDeleteCourse()}>
                            삭제하기
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
            <h2>강의 정보</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>강의명</label>
                <input type="text" name="courseTitle" onChange={handleOnChange} value={courseDetails.courseTitle} readOnly={!isUpdatable}/>
            </div>
            <div>
                <label>강사</label>
                <input type="text" name="courseTeacher" onChange={handleOnChange} value={courseDetails.courseTeacher} readOnly={!isUpdatable}/>
            </div>
            <div>
                <label>가격</label>
                <input type="text" name="coursePrice" onChange={handleOnChange} value={courseDetails.coursePrice} readOnly={!isUpdatable}/>
            </div>
            <div>
                <label>설명</label>
                <textarea name="courseDec" onChange={handleOnChange} value={courseDetails.courseDec} readOnly={!isUpdatable}/>
            </div>
            <div>
                <label>레벨</label>
                <select name="courseLevel">
                    {courseLevels.map((level, i) => (
                        <option key={i} value={courseDetails.courseLevel}  disabled={!isUpdatable} selected>
                            {courseDetails.courseLevel === level ? level + "[선택]" : level}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>카테고리</label>
                <select name="courseCategory">
                    {courseCategories.map((category, i) => (
                        <option key={i} value={courseDetails.courseCategory +"[선택]"} selected disabled={!isUpdatable}>
                            {courseDetails.courseCategory === category ? category + "[선택]" : category}
                        </option>
                    ))}
                </select>
            </div>
            {isUpdatable === true ? 
            <div>
                <button type="submit">수정 완료</button> 
                <button onClick={(e) => {e.preventDefault(); setIsUpdatable(false)}}>취소하기</button>
            </div> 
            : 
            <div>
                <button onClick={handleUpdate}>수정하기</button> 
                <button onClick={handleModal}>삭제하기</button><button className="courseListBtn" 
                onClick={() => navigate("/admin/courses")}>리스트 보기</button>
            </div>}
        </form>
        </div>
    );
}

// const CourseDetailForm = ({ courseCategories, courseLevels, handleOnChange, handleSubmit , course_details}) => {
//     return (

        // <table className="courseListTable">
        //     <tr>
        //         <th>번호</th>
        //         <td><input type="text" name="course_mp" value={id}/></td>
        //         <th>강의 명</th>
        //         <td colSpan={5}>{course.course_title}</td>
        //     </tr>
        //     <tr>
        //         <th>강사</th>
        //         <td>{course.course_teacher}</td>
        //         <th>가격</th>
        //         <td>{course.course_price}</td>
        //         <th>카테고리</th>
        //         <td>{course.course_category}</td>
        //         <th>레벨</th>
        //         <td>{course.course_level}</td>
        //     </tr>

        //     <tr>
        //         <td colSpan={8}>{course.course_dec}</td>
        //     </tr>
        //     <tr>
        //         <button>수정</button>
        //         <button onClick={() => handleModal()}>삭제</button>
        //     </tr>
        // </table>
        // </form>
    // );
// };
