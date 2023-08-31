import axios from "axios";
import { useState } from "react";
import "../../styles/Admin_Course.css";
import { useNavigate } from "react-router-dom";
import "../../styles/admin_Course_Write.css";

export default function Admin_CourseWrite() {
    const navigate = useNavigate();
    const baseUrl = "http://localhost:9090";
    const courseLevels = ["HIGH", "MID", "LOW"];
    const courseCategories = ["BE", "FE"];
    const [imgFile, setImgFile] = useState(null);
    const [imgBase64, setImgBase64] = useState([]);
    const [inputs, setInputs] = useState({
        courseTitle: "",
        courseTeacher: "",
        coursePrice: "",
        courseDec1: "",
        courseDec2: "",
        courseDec3: "",
        courseLevel: courseLevels[0],
        courseCategory: courseCategories[0],
    });

    // 백으로 전송
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }
        formData.append("courseImgFile", imgFile);

        await axios
            .post(baseUrl + "/admin/course", formData)
            .then((res) => {
                if (res.status === 200) {
                    window.alert("강의가 등록되었습니다.");
                    navigate("/admin/courses");
                }
            })
            .catch(function (err) {
                window.alert("강의 등록이 실패하였습니다. " + err);
            });
    };

    // useState에 입력값 받기
    const handleOnChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    //사진 업로드
    const handleChangeFile = (e) => {
        setImgFile(e.target.files[0]);
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
            <h2 className="mb-5">강의 등록</h2>
            <form class="row g-3 needs-validation mb-5 text_align_left" onSubmit={handleSubmit} novalidate>
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
                        required
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
                        onChange={handleOnChange}
                        required
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
                            aria-describedby="inputGroupPrepend"
                            onChange={handleOnChange}
                            required
                        />
                        <div class="invalid-feedback">Please choose a username.</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom04" class="form-label">
                        카테고리
                    </label>
                    <select class="form-select" id="validationCustom04" name="courseCategory" required>
                        <option selected disabled value="">
                            선택...
                        </option>
                        {courseCategories.map((category, i) => (
                            <option key={i} value={category}>
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
                    <select class="form-select" id="validationCustom04" name="courseLevel" required>
                        <option selected disabled value="">
                            선택...
                        </option>
                        {courseLevels.map((level, i) => (
                            <option key={i} value={level}>
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
                        onChange={handleOnChange}
                        required
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
                        onChange={handleOnChange}
                        required
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
                        onChange={handleOnChange}
                        required
                    />
                    <div class="invalid-feedback">Please provide a valid city.</div>
                </div>
                <div class="mb-3">
                    <input type="file" class="form-control" aria-label="file example" onChange={handleChangeFile} accept="image/jpeg, image/png" required />
                    <div class="invalid-feedback">Example invalid form file feedback</div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">
                        강의 등록
                    </button>
                </div>
            </form>
        </div>
    );
}

// import axios from "axios";
// import { useState } from "react";
// import "../../styles/Admin_Course.css";
// import { useNavigate } from "react-router-dom";

// export default function Admin_CourseWrite() {
//     const navigate = useNavigate();
//     const baseUrl = "http://localhost:9090";
//     const courseLevels = ["HIGH", "MID", "LOW"];
//     const courseCategories = ["BE", "FE"];
//     const [imgFile, setImgFile] = useState(null);
//     const [imgBase64, setImgBase64] = useState([]);
//     const [inputs, setInputs] = useState({
//         courseTitle: "",
//         courseTeacher: "",
//         coursePrice: "",
//         courseDec1: "",
//         courseDec2: "",
//         courseDec3: "",
//         courseLevel: courseLevels[0],
//         courseCategory: courseCategories[0]
//     });

//     // 백으로 전송
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         for (const key in inputs) {
//             formData.append(key, inputs[key]);
//         }
//         formData.append("courseImgFile", imgFile);

//         await axios
//             .post(baseUrl + "/admin/course", formData)
//             .then((res) => {
//                 if (res.status === 200) {
//                     window.alert("강의가 등록되었습니다.");
//                     navigate(-1);
//                 }
//             })
//             .catch(function (err) {
//                 window.alert("강의 등록이 실패하였습니다. " + err);
//             });
//     };

//     // useState에 입력값 받기
//     const handleOnChange = (e) => {
//         setInputs({
//             ...inputs,
//             [e.target.name]: e.target.value,
//         });
//     };

//     //사진 업로드
//     const handleChangeFile = (e) => {
//         setImgFile(e.target.files[0]);
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
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>강의명</label>
//                 <input type="text" name="courseTitle" onChange={handleOnChange} />
//             </div>
//             <div>
//                 <label>강사</label>
//                 <input type="text" name="courseTeacher" onChange={handleOnChange} />
//             </div>
//             <div>
//                 <label>가격</label>
//                 <input type="text" name="coursePrice" onChange={handleOnChange} />
//             </div>
//             <div>
//                 <label>상세 설명1</label>
//                 <textarea name="courseDec1" onChange={handleOnChange} />
//             </div>
//             <div>
//                 <label>상세 설명2</label>
//                 <textarea name="courseDec2" onChange={handleOnChange} />
//             </div>
//             <div>
//                 <label>상세 설명3</label>
//                 <textarea name="courseDec3" onChange={handleOnChange} />
//             </div>
//             <div>
//                 <label>레벨</label>
//                 <select name="courseLevel">
//                     {courseLevels.map((level, i) => (
//                         <option key={i} value={level}>
//                             {level}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label>카테고리</label>
//                 <select name="courseCategory">
//                     {courseCategories.map((category, i) => (
//                         <option key={i} value={category}>
//                             {category}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label>사진 업로드</label><br/>
//                 <p id="originName" style={{display : "inline-block"}} >{imgFile === null? "하이": imgFile.name}</p>
//                 <input type="file" id="file" onChange={handleChangeFile} />
//                 <h3>업로드 한 사진 미리보기</h3>
//                 {imgBase64.map((item) => {
//                     return (
//                         <img
//                             key={item}
//                             src={item}
//                             alt={"First slide"}
//                             style={{ width: "200px", height: "150px" }}
//                         />
//                     );
//                 })}
//             </div>
//             <button type="submit">등록하기</button>
//             <button onClick={() => navigate("/admin/courses")}>취소하기</button>
//         </form>
//     );
// }
