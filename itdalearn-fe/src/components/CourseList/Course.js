/* eslint-disable */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/course.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
export default function Course() {
    scrollTo(top);
    let { id } = useParams();
    const baseUrl = "http://localhost:9090";
    const courseLevels = ["HIGH", "MID", "LOW"];
    const courseCategories = ["BE", "FE"];
    const [courseDetails, setCourseDetails] = useState({
      // courseNo: "",
      courseTitle: "",
      courseTeacher: "",
      coursePrice: "",
      courseDec1: "",
      courseDec2: "",
      courseDec3: "",
      courseLevel: courseLevels[0],
      courseCategory: courseCategories[0],
  });
  const [courseImgDtoList, setCourseImgDtoList] = useState([]);
  const [courseImgDto, setCourseImgDto] = useState({
    courseImgDtoNo: "",
    imgName: "",
    imgUrl: "",
    oriImgName: "",
});
    //수강평기능
    const [value, setValue] = React.useState(5);
    //수강코스 디테일 정보 탭기능
    const [valuetab, setValuetab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValuetab(newValue);
    };

    useEffect(() => {
      const getCourseDetails = async () => {
          try {
              const response = await axios.get(baseUrl + "/course/" + id);
              console.log(response)
              setCourseDetails(response.data.courseFormDto);
              setCourseImgDtoList(response.data.courseFormDto.courseImgDtoList);
          } catch (error) {
              console.log(error);
          }
      };
      getCourseDetails();
  }, []);

    const addCartItem = () => {
        4;
        console.log("token : " + localStorage.getItem("token"));
        console.log("상품아이디" + id);
        axios
            .post(
                "http://localhost:9090/cart",
                {
                    courseNo: id,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                console.log("카트담기 성공");
                console.log("200", response.data);

                if (response.status === 200) {
                    alert("장바구니 담기에 성공하였습니다.");
                    console.log("카트담기 성공");
                }
            })
            .catch((error) => console.log(error.response));
    };

    const OrderCourse = () => {
        axios
            .post("http://localhost:9090/order", {
                courseNo: id,
            })
            .then((response) => {
                console.log("200", response.data);

                if (response.status === 200) {
                    alert("주문 되었습니다. ");
                    console.log("주문하기 성공");
                }
            })
            .catch((error) => console.log(error.response));
    };

    let navigate = useNavigate();

    return (
        <>
     <div className="coursedetailback">
        <div><img src={courseImgDtoList[0]?.imgUrl} /></div>

        <div className="coursedetailtext"> 
        <p> Category&nbsp; : &nbsp;{courseDetails.courseCategory === "BE"? "백엔드" : "프론트엔드"} </p>
        <h3>{courseDetails.courseTitle}<IconButton color="secondary" aria-label="add to shopping cart" onClick={() => addCartItem()}>
        <AddShoppingCartIcon />
      </IconButton> </h3>
        <br />
        <br />
        <Box sx={{
        '& > legend': { mt: 2 },}}/>
     <Typography component="legend">(5.0) 144개의 수강평 * 5898명의 수강생</Typography>
    <Rating name="read-only" value={value} readOnly />
        <p> 강사 : {courseDetails.courseTeacher}</p>
        <p> 난이도 : {courseDetails.courseLevel}</p> 
        </div>
    </div>
        
            <div className="coursedetailsecondbox">
                <div className="detailtab">
                    <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: "background.paper" }}>
                        <Tabs
                            value={valuetab}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="상세 설명" />
                            <Tab label="강의 소개" />
                            <Tab label="추천 대상" />
                        </Tabs>

                        <h4>상세 설명</h4>
                        <br />
                        <p>{courseDetails.courseDec1}</p>

                        <br />
                        <h4>강의 소개</h4>
                        <br />
                        <p>{courseDetails.courseDec2}</p>
                        <br />
                        <h4>추천 대상</h4>
                        <br />
                        <p>{courseDetails.courseDec3}</p>
              
                <div className="coursedetailcart">
                    <hr />

            <h4>상세 설명</h4>
            <br />
            <div><img src={courseImgDtoList[1]?.imgUrl} /></div>
             <p>{courseDetails.courseDec1}</p>
             
            <br />
             <h4>강의 소개</h4>
             <br />
             <div><img src={courseImgDtoList[2]?.imgUrl} /></div>
            <p>{courseDetails.courseDec2}</p> 
            <br />
            <h4>추천 대상</h4>
            <br />
            <div><img src={courseImgDtoList[3]?.imgUrl} /></div>
            <p>{courseDetails.courseDec3}</p>
            </div>
   
    </Box>  
    </div>
                    <h4> 결제 금액 : {courseDetails.coursePrice}원 </h4>
                    <Button variant="contained" onClick={() => addCartItem()}>
                        장바구니 담기
                    </Button>
                    <br />
                    <Button variant="contained" color="success" onClick={() => OrderCourse()}>
                        주문하기
                    </Button>

                    <hr />

                    <ul className="detailsmall">
                        <li>◎ 총 69개의 수업(20시간 46분)</li>
                        <li>◎ 수강 기한 : 12개월</li>
                        <li>◎ 수료증 : 발급</li>
                        <li>◎ 난이도 : LOW(초급)</li>
                    </ul>
                </div>
          
        </>
    );
}
