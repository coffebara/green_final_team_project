import "../../styles/cart.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRoutes } from "react-router-dom";
import { Location } from "react-router-dom";

export default function CartList() {
  const router = useRoutes;
  // 카트 리스트를 조회하는 axios
  const baseUrl = "http://localhost:9090";
  const [courses, setCourses] = useState([]);

  const [checkedList, setCheckedList] = useState([]
  );
  console.log(checkedList);

 

  const [totalarray, setTotalarray] = useState([]);
  console.log(totalarray);
  const [subtotal , setSubtotal] = useState(0);
  const [totalprice, setTotalprice] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);


    useEffect(() => {
     setTotalprice(0);
    let totalP = 0;
    let totalDiscount = 0;
    totalarray.map(item => totalP += item);
    
    setTotalprice(totalP - (totalP * ((totalDiscount/totalarray.length || 0) / 100)))
  
  }, [checkedList, 0, courses])


  // 전체 체크 클릭 시 발생하는 함수

    const getCourses = async () => {
    
      if(localStorage.getItem("token") == null){
        window.alert("로그인이 필요한 서비스입니다.")
        window.location.href = '/members/login';
      }
      const response = await axios.get(baseUrl + "/cart",{
        headers: {
            Authorization: localStorage.getItem("token"),
        }
    }) 
      setCourses(response.data.cartCources); 
      console.log(courses);
    };
    
  useEffect(()=>{
    getCourses();
   
  },[])

  const deletecart = () => {   
    
    axios.delete("http://localhost:9090/cartCourse/"+ checkedList[0],
      {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    }
    )
    
    .then((response) => {
    
    console.log("삭제성공");
    getCourses();
    setTotalarray([]);
    console.log("200", response.data);  
  })
  .catch((error) => console.log(error.response));
  
};

   
  
   const OrderCourseList = async (e) => {
 
     const payload = {
      cartOrderDtoList : checkedList.map((cartCourseNo) => (
        {
        "cartCourseNo": cartCourseNo,
        }
        )),
     };
     console.log(payload);

    await axios
      .post(baseUrl + "/cart/orders", payload,
      {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    } )
    .then(function (res) {
      if (res.status === 200) {
        window.alert("전송 성공");
        getCourses();
        setTotalarray([]);
      }
    })
    .catch((error) => {
      console.log(error.response)
  alert("이미 주문한 상품입니다.");
  })
   };




  const onCheckedAll = useCallback(
    
    (checked) => {
      if (checked) {
        const checkedListArray = [];
        courses.forEach((list) => checkedListArray.push(list.cartCourseNo));
        setCheckedList(checkedListArray);
        const totalpricearray = [];
        courses.forEach((list) => totalpricearray.push(list.coursePrice));
        setTotalarray(totalpricearray);
        
      } else {
        setCheckedList([]);
        setTotalarray([]);
       
      }
    },
    [courses]
  );
  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedList([...checkedList, list.cartCourseNo]);
        setTotalarray([...totalarray, list.coursePrice]);
       
      } else {
        setCheckedList(checkedList.filter((el) => el !== list.cartCourseNo));
        setTotalarray(totalarray.filter((el) => el !== list.coursePrice));
       
      }
    },
    [checkedList]
    [totalarray]

   
  );



  return (
    <>
    {/* 카트리스트 상단 바 */}
     <section id="cart_title">
                <div className="cart_container">
                    신청하기
                    <br />
                    Step 1. 강의 선택
                </div>
            </section>

            {/* 여기서부터 카트 테이블  */}
      <div className="title"><h2>수강바구니</h2>
     </div>
      <div className="carttotalbox">

        <div className="carttablebox">
          <hr />
          <>

<div className="tablecontent">
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>  
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell> <input
                type="checkbox"
                onChange={(e) => onCheckedAll(e.target.checked)}
                checked={
                  checkedList.length === 0
                    ? false
                    : checkedList.length === courses.length
                    ? true
                    : false
                }
                
              /> 전체선택</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">   
       </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {courses.map((list, index) => (
            <TableRow key={index}>
              <TableCell> <input
                  key={list.id}
                  type="checkbox"
                  onChange={(e) => onCheckedElement(e.target.checked, list)}
                  checked={checkedList.includes(list.cartCourseNo) ? true : false}
                /> <img src={list.imgUrl} /></TableCell>
              <TableCell align="left">{list.courseTitle}</TableCell>
              <TableCell align="right">{list.coursePrice}원</TableCell>
              <TableCell align="right">
      <Button key={list.cartCourseNo} variant="outlined" startIcon={<DeleteIcon />}  
       onClick={deletecart}>
        선택삭제
      </Button>
                </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>선택 상품 합계</TableCell>
            <TableCell align="right">
            {totalprice}원
              </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>할인금액</TableCell>
            <TableCell align="right">
              </TableCell>
            <TableCell align="right">{discountprice} 원
              </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}>총 결제금액</TableCell>
            <TableCell align="right">
            {totalprice}원
              </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
        </div>

      < div className="cartbox">

       <div className="user">
        구매자 정보 
        <hr />
        이름 : 
        <br />
        이메일 : 
        <hr/>
        
       </div>
       <div className="priceboxtotal">
      <div className="pricebox">
      <span>선택 과목 합계  </span>
      <br />
      <span className="red">할인 금액 </span>
      <br />
      <span>총 결제 금액 </span>
       <br />   </div>

       <div className="won">
        <span>{totalprice}원</span>
        <br />
        <span className="red">원</span>
        <br />
        <span> {totalprice}원</span>
       </div>
       </div>
      
    <Button variant="contained" color="success" onClick={OrderCourseList} >
       주문하기
      </Button>
      <hr />
      </div>
      </div>
    </>
  );
}


