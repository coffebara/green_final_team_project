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
    const SellStatus = ["SELL", "READY", "WAIT"];
    const [imgFile, setImgFile] = useState([]);
    const [imgBase64, setImgBase64] = useState([]);
    const [inputs, setInputs] = useState({
        courseTitle: "",
        courseTeacher: "",
        coursePrice: "",
        courseDec1: "",
        courseDec2: "",
        courseDec3: "",
        sellStatus: SellStatus[0],
        courseLevel: courseLevels[0],
        courseCategory: courseCategories[0],
        sellCount : 0
    });
  
    // 백으로 전송
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }
        console.log(inputs);
        console.log(imgFile)
        for (let i = 0; i < imgFile.length; i++) {
            formData.append("courseImgFile", imgFile[i]);
        }

        console.log(imgFile);

        await axios
            .post(baseUrl + "/admin/course", formData,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
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
        setImgFile([...imgFile, e.target.files[0]]);
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
                <div class="col-md-4">
                    <label for="validationCustom04" class="form-label">
                        카테고리
                    </label>
                    <select
                        class="form-select"
                        id="validationCustom04"
                        name="courseCategory"
                        required
                        onChange={handleOnChange}
                    >
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
                <div class="col-md-4">
                    <label for="validationCustom04" class="form-label">
                        강의 레벨
                    </label>
                    <select class="form-select" id="validationCustom04" name="courseLevel" required onChange={handleOnChange}>
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
                <div class="col-md-4">
                    <label for="validationCustom05" class="form-label">
                        판매 상태
                    </label>
                    <select
                        class="form-select"
                        id="validationCustom05"
                        name="courseSellStatus"
                        required
                        onChange={handleOnChange}
                    >
                        <option selected disabled value="">
                            선택...
                        </option>
                        {SellStatus.map((sellStatus, i) => (
                            <option key={i} value={sellStatus}>
                                {sellStatus}
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
                <div>
                    <input
                        type="file"
                        name="img1"
                        class="form-control"
                        aria-label="file example"
                        onChange={handleChangeFile}
                        accept="image/jpeg, image/png"
                        required
                    />
                    <div class="invalid-feedback">Example invalid form file feedback</div>
                </div>
                <div>
                    <input
                        type="file"
                        name="img2"
                        class="form-control"
                        aria-label="file example"
                        onChange={handleChangeFile}
                        accept="image/jpeg, image/png"
                    />
                    <div class="invalid-feedback">Example invalid form file feedback</div>
                </div>
                <div>
                    <input
                        type="file"
                        name="img3"
                        class="form-control"
                        aria-label="file example"
                        onChange={handleChangeFile}
                        accept="image/jpeg, image/png"
                    />
                    <div class="invalid-feedback">Example invalid form file feedback</div>
                </div>
                <div>
                    <input
                        type="file"
                        name="img4"
                        class="form-control"
                        aria-label="file example"
                        onChange={handleChangeFile}
                        accept="image/jpeg, image/png"
                    />
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
