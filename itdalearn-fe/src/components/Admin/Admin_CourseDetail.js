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

        courseTitle: "",
        courseTeacher: "",
        coursePrice: "",
        courseDec1: "",
        courseDec2: "",
        courseDec3: "",
        courseLevel: courseLevels[0],
        courseCategory: courseCategories[0],
        courseFormDtoNo: "",
        courseImgNo: "",

    });
    const [isUpdatable, setIsUpdatable] = useState(false);
    const [courseImgDto, setCourseImgDto] = useState({
        courseImgDtoNo: "",
        imgName: "",
        imgUrl: "",
        oriImgName: "",
    });
    const [imgBase64, setImgBase64] = useState([]);
    const [courseImgFile, setCourseImgFile] = useState(null);

    //--------------강의 정보 가져오기
    const getCourseDetails = async () => {
        try {
            const response = await axios.get(baseUrl + "/admin/course/" + id);
            console.log(response);
            const {
                courseTitle,
                courseTeacher,
                coursePrice,
                courseDec1,
                courseDec2,
                courseDec3,
                courseLevel,
                courseCategory,
            } = response.data.courseFormDto;
            setCourseDetails({
                courseTitle: courseTitle,
                courseTeacher: courseTeacher,
                coursePrice: coursePrice,
                courseDec1: courseDec1,
                courseDec2: courseDec2,
                courseDec3: courseDec3,
                courseLevel: courseLevel,
                courseCategory: courseCategory,
                courseFormDtoNo: id,
                courseImgNo: id,
            });
            setCourseImgDto(response.data.courseFormDto.courseImgDto);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

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

        formData.append("courseImgFile", courseImgFile);

        await axios
            .patch(baseUrl + "/admin/course/" + id, formData)
            .then((response) => {
                window.alert("강의가 수정되었습니다.");
                console.log(response);
                navigate(-1);
            })
            .catch((error) => {
                if (error.response.status === 302) {
                    window.alert("강의가 수정이 실패하였습니다.");

                }
            });
    };

    //---------------강의 삭제하기
    const handleDeleteCourse = () => {
        setIsModalShow(false);
        axios
            .delete(baseUrl + "/admin/course/" + id)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response.status === 302) {
                    navigate("/admin/courses");
                }
            });
    };
    const handleModal = (e) => {
        e.preventDefault();
        setIsModalShow(true);
    };

    //수정
    const handleUpdate = (e) => {
        e.preventDefault();
        setIsUpdatable(true);
    };

    //사진 업로드
    const handleChangeFile = (e) => {

        setCourseImgFile(e.target.files[0]);
        setImgBase64([]);
        if (e.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
                if (base64) {
                    let base64Sub = base64.toString();
                    setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
                }
            };
        }
    };
    return (
        <div className="container mt-5">

            {/* 모달 시작 */}
            <Modal
                show={isModalShow}
                backdrop="static"
                size="s"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div>
                    <Modal.Body>

                        <h4>해당 강의를 삭제하시겠습니까?</h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="cart_redBtn"
                            variant="outline-secondary"
                            onClick={() => setIsModalShow(false)}
                        >
                            취소
                        </Button>
                        <Button
                            className="cart_redBtn"
                            variant="outline-danger"
                            onClick={() => handleDeleteCourse()}
                        >
                            삭제하기
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <h2 className="mb-5">강의 상세보기</h2>
            <form
                class="row g-3 needs-validation mb-5 text_align_left"
                onSubmit={handleSubmit}
                novalidate
            >
                <div class="col-md-6">
                    <label for="validationCustom01" class="form-label">
                        강의명
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        name="courseTitle"
                        onChange={handleOnChange}
                        value={courseDetails.courseTitle}
                        required
                        readOnly={!isUpdatable}
                    />
                    <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-3">
                    <label for="validationCustom02" class="form-label">
                        강사명
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="validationCustom02"
                        name="courseTeacher"
                        value={courseDetails.courseTeacher}
                        onChange={handleOnChange}
                        required
                        readOnly={!isUpdatable}
                    />
                    <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-3">
                    <label for="validationCustomUsername" class="form-label">
                        가격
                    </label>
                    <div class="input-group has-validation">
                        <input
                            type="number"
                            class="form-control"
                            id="validationCustomUsername"
                            name="coursePrice"
                            value={courseDetails.coursePrice}
                            aria-describedby="inputGroupPrepend"
                            onChange={handleOnChange}
                            required
                            readOnly={!isUpdatable}
                        />
                        <div class="invalid-feedback">Please choose a username.</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom04" class="form-label">
                        카테고리
                    </label>
                    <select
                        class="form-select"
                        id="validationCustom04"
                        name="courseCategory"
                        required
                        disabled={!isUpdatable}
                    >
                        <option selected disabled value="">
                            선택...
                        </option>
                        {courseCategories.map((category, i) => (
                            <option key={i} value={courseDetails.courseCategory} selected>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div class="invalid-feedback">Please select a valid state.</div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom04" class="form-label">
                        강의 레벨
                    </label>
                    <select
                        class="form-select"
                        id="validationCustom04"
                        name="courseLevel"
                        required
                        disabled={!isUpdatable}
                    >
                        <option selected disabled value="">
                            선택...
                        </option>
                        {courseLevels.map((level, i) => (
                            <option key={i} value={courseDetails.courseLevel} selected>
                                {level}
                            </option>
                        ))}
                    </select>
                    <div class="invalid-feedback">Please select a valid state.</div>
                </div>
                <div class="col-md-12">
                    <label for="validationCustom03" class="form-label">
                        강의 설명 1
                    </label>
                    <textarea
                        rows="3"
                        class="form-control admin-write-textarea"
                        id="validationCustom03"
                        name="courseDec1"
                        value={courseDetails.courseDec1}
                        onChange={handleOnChange}
                        required
                        readOnly={!isUpdatable}
                    />
                    <div class="invalid-feedback">Please provide a valid city.</div>
                </div>
                <div class="col-md-12">
                    <label for="validationCustom03" class="form-label">
                        강의 설명 2
                    </label>
                    <textarea
                        rows="3"
                        class="form-control admin-write-textarea"
                        id="validationCustom03"
                        name="courseDec2"
                        value={courseDetails.courseDec2}
                        onChange={handleOnChange}
                        required
                        readOnly={!isUpdatable}
                    />
                    <div class="invalid-feedback">Please provide a valid city.</div>
                </div>
                <div class="col-md-12">
                    <label for="validationCustom03" class="form-label">
                        강의 설명 3
                    </label>
                    <textarea
                        rows="3"
                        class="form-control admin-write-textarea"
                        id="validationCustom03"
                        name="courseDec3"
                        value={courseDetails.courseDec3}
                        onChange={handleOnChange}
                        required
                        readOnly={!isUpdatable}
                    />
                    <div class="invalid-feedback">Please provide a valid city.</div>
                </div>
                <div class="mb-3">
                    <input
                        type="file"
                        class="form-control"
                        aria-label="file example"
                        onChange={handleChangeFile}
                        id="validationFile"
                        accept="image/jpeg, image/png"
                        // required
                    />
                    <label for="validationFile" class="form-label">{courseImgDto.oriImgName}</label>
                    <div class="invalid-feedback">Example invalid form file feedback</div>
                </div>
                <div class="col-12">
                    {!isUpdatable ? (
                        <>
                            <button
                                class="btn btn-primary"
                                type="button"
                                onClick={() => setIsUpdatable(true)}
                            >
                                강의 수정
                            </button>
                            <button class="btn btn-primary" type="button" onClick={handleModal}>
                                삭제하기
                            </button>
                        </>
                    ) : (
                        <>
                            <button class="btn btn-primary" type="submit">
                                강의 등록
                            </button>
                            <button
                                class="btn btn-primary"
                                type="button"
                                onClick={() => {
                                    setIsUpdatable(false);
                                    getCourseDetails();
                                }}
                            >
                                취소
                            </button>
                        </>
                    )}
                </div>

            </form>
        </div>
    );
}


// import axios from "axios";
// import { useEffect, useState } from "react";
// import "../../styles/Admin_Course.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button, Modal } from "react-bootstrap";

// export default function Admin_CourseDetail() {
//     const navigate = useNavigate();
//     const baseUrl = "http://localhost:9090";
//     const { id } = useParams();
//     const [isModalShow, setIsModalShow] = useState(false);
//     const courseLevels = ["HIGH", "MID", "LOW"];
//     const courseCategories = ["BE", "FE"];
//     const [courseDetails, setCourseDetails] = useState({
//         courseTitle: "",
//         courseTeacher: "",
//         coursePrice: "",
//         courseDec1: "",
//         courseDec2: "",
//         courseDec3: "",
//         courseLevel: courseLevels[0],
//         courseCategory: courseCategories[0],
//         courseFormDtoNo: "",
//         courseImgNo: "",
//     });
//     const [isUpdatable, setIsUpdatable] = useState(false);
//     const [courseImgDto, setCourseImgDto] = useState({
//         courseImgDtoNo: "",
//         imgName: "",
//         imgUrl: "",
//         oriImgName: "",
//     });
//     const [imgBase64, setImgBase64] = useState([]);
//     const [courseImgFile, setCourseImgFile] = useState(null);

//     //--------------강의 정보 가져오기
//     useEffect(() => {
//         const getCourseDetails = async () => {
//             try {
//                 const response = await axios.get(baseUrl + "/admin/course/" + id);
//                 console.log(response)
//                 const {
//                     courseTitle,
//                     courseTeacher,
//                     coursePrice,
//                     courseDec1,
//                     courseDec2,
//                     courseDec3,
//                     courseLevel,
//                     courseCategory,
//                 } = response.data.courseFormDto;
//                 setCourseDetails({
//                     courseTitle: courseTitle,
//                     courseTeacher: courseTeacher,
//                     coursePrice: coursePrice,
//                     courseDec1: courseDec1,
//                     courseDec2: courseDec2,
//                     courseDec3: courseDec3,
//                     courseLevel: courseLevel,
//                     courseCategory: courseCategory,
//                     courseFormDtoNo: id,
//                     courseImgNo: id,
//                 });
//                 setCourseImgDto(response.data.courseFormDto.courseImgDto);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         getCourseDetails();
//     }, []);

//     //---------------강의 수정하기

//     // useState에 입력값 받기
//     const handleOnChange = (e) => {
//         setCourseDetails({
//             ...courseDetails,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // 백으로 전송
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         for (const key in courseDetails) {
//             formData.append(key, courseDetails[key]);
//         }

//         formData.append("courseImgFile", courseImgFile);

//         await axios
//             .patch(baseUrl + "/admin/course/" + id, formData)
//             .then((response) => {
//                 window.alert("강의가 수정되었습니다.");
//                 console.log(response);
//                 navigate(-1);
//             })
//             .catch((error) => {
//                 if (error.response.status === 302) {
//                     window.alert("강의가 수정이 실패하였습니다.");
//                 }
//             });
//     };

//     //---------------강의 삭제하기
//     const handleDeleteCourse = () => {
//         setIsModalShow(false);
//         axios
//             .delete(baseUrl + "/admin/course/" + id)
//             .then((response) => {
//                 console.log(response);
//             })
//             .catch((error) => {
//                 if (error.response.status === 302) {
//                     navigate("/admin/courses");
//                 }
//             });
//     };
//     const handleModal = (e) => {
//         e.preventDefault();
//         setIsModalShow(true);
//     };

//     //수정
//     const handleUpdate = (e) => {
//         e.preventDefault();
//         setIsUpdatable(true);
//     };

//     //사진 업로드
//     const handleChangeFile = (e) => {
//         setCourseImgFile(e.target.files[0]);
//         setImgBase64([]);
//         if (e.target.files[0]) {
//             let reader = new FileReader();
//             reader.readAsDataURL(e.target.files[0]);
//             reader.onloadend = () => {
//                 const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
//                 if (base64) {
//                     let base64Sub = base64.toString();
//                     setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
//                 }
//             };
//         }
//     };
//     return (
//         <div>
//             {/* 모달 시작 */}
//             <Modal
//                 show={isModalShow}
//                 backdrop="static"
//                 size="s"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//             >
//                 <div>
//                     <Modal.Body>
//                         <h4>해당 코스를 삭제하시겠습니까?</h4>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button
//                             className="cart_redBtn"
//                             variant="outline-secondary"
//                             onClick={() => setIsModalShow(false)}
//                         >
//                             취소
//                         </Button>
//                         <Button
//                             className="cart_redBtn"
//                             variant="outline-danger"
//                             onClick={() => handleDeleteCourse()}
//                         >
//                             삭제하기
//                         </Button>
//                     </Modal.Footer>
//                 </div>
//             </Modal>
//             <h2>강의 정보</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>강의명</label>
//                     <input
//                         type="text"
//                         name="courseTitle"
//                         onChange={handleOnChange}
//                         value={courseDetails.courseTitle}
//                         readOnly={!isUpdatable}
//                     />
//                 </div>
//                 <div>
//                     <label>강의 이미지</label>
//                     <img src={courseImgDto.imgUrl} />
//                 </div>
//                 <div>
//                     <label>강사</label>
//                     <input
//                         type="text"
//                         name="courseTeacher"
//                         onChange={handleOnChange}
//                         value={courseDetails.courseTeacher}
//                         readOnly={!isUpdatable}
//                     />
//                 </div>
//                 <div>
//                     <label>가격</label>
//                     <input
//                         type="text"
//                         name="coursePrice"
//                         onChange={handleOnChange}
//                         value={courseDetails.coursePrice}
//                         readOnly={!isUpdatable}
//                     />
//                 </div>
//                 <div>
//                     <label>설명1</label>
//                     <textarea
//                         name="courseDec1"
//                         onChange={handleOnChange}
//                         value={courseDetails.courseDec1}
//                         readOnly={!isUpdatable}
//                     />
//                 </div>
//                 <div>
//                     <label>설명2</label>
//                     <textarea
//                         name="courseDec2"
//                         onChange={handleOnChange}
//                         value={courseDetails.courseDec2}
//                         readOnly={!isUpdatable}
//                     />
//                 </div>
//                 <div>
//                     <label>설명3</label>
//                     <textarea
//                         name="courseDec3"
//                         onChange={handleOnChange}
//                         value={courseDetails.courseDec3}
//                         readOnly={!isUpdatable}
//                     />
//                 </div>
//                 <div>
//                     <label>레벨</label>
//                     <select name="courseLevel">
//                         {courseLevels.map((level, i) => (
//                             <option
//                                 key={i}
//                                 value={courseDetails.courseLevel}
//                                 disabled={!isUpdatable}
//                                 selected
//                             >
//                                 {courseDetails.courseLevel === level ? level + "[선택]" : level}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>카테고리</label>
//                     <select name="courseCategory">
//                         {courseCategories.map((category, i) => (
//                             <option
//                                 key={i}
//                                 value={courseDetails.courseCategory + "[선택]"}
//                                 selected
//                                 disabled={!isUpdatable}
//                             >
//                                 {courseDetails.courseCategory === category
//                                     ? category + "[선택]"
//                                     : category}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label value={courseImgDto.oriImgName}>사진 업로드</label>
//                     <input type="file"  onChange={handleChangeFile} />
//                     <h3>업로드 한 사진 미리보기</h3>
//                     {imgBase64.map((item) => {
//                         return (
//                             <img
//                                 key={item}
//                                 src={item}
//                                 alt={"First slide"}
//                                 style={{ width: "200px", height: "150px" }}
//                             />
//                         );
//                     })}
//                 </div>
//                 {isUpdatable === true ? (
//                     <div>
//                         <button type="submit">수정 완료</button>
//                         <button
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 setIsUpdatable(false);
//                             }}
//                         >
//                             취소하기
//                         </button>
//                     </div>
//                 ) : (
//                     <div>
//                         <button onClick={handleUpdate}>수정하기</button>
//                         <button onClick={handleModal}>삭제하기</button>
//                         <button
//                             className="courseListBtn"
//                             onClick={() => navigate("/admin/courses")}
//                         >
//                             리스트 보기
//                         </button>
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// }

