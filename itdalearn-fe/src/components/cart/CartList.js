import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../../styles/cart.css";
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

export default function CartList() {
  
  // 카트 리스트를 조회하는 axios
  const baseUrl = "http://localhost:9090";
  const [courses, setCourses] = useState([]);
  const [checkedList, setCheckedLists] = useState([]);

  console.log(checkedList);
 
  const [subtotal , setSubtotal] = useState(0);
  const [totalprice, setTotalprice] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);


  

    const getCourses = async () => {
      const response = await axios.get(baseUrl + "/cart"); 
      setCourses(response.data.cartCources); 
      console.log(courses);
    };
    
  useEffect(()=>{
    getCourses();
  },[])

  const deletecart = () => {   
    axios.delete("http://localhost:9090/cartCourse/"+ checkedList[0].cartCourseNo)
    .then((response) => {
    
    console.log("삭제성공");

    getCourses();
    console.log("200", response.data);  
  })
  .catch((error) => console.log(error.response));
  
};

// const OrderCourseList = useCallback(
//   (checked) => {
//     if (checked) {
//       const datalist = [];

//       checkedList.forEach((list) => datalist.push(list.cartCourseNo));

//       setData(datalist);
      
//     } else {
//       setData([]);
//       setParam(data);
//       axios
//       .post(baseUrl + "/cart/orders", param)
//       .then(function (res) {
//         if (res.status === 200) {
//           window.alert("전송 성공");
//         }
//       })
//       .catch(function (err) {
//         window.alert("실패 " + err);
//       });
//     }
//   },
//   [checkedList]

  
// );
//   const [param, setParam] = useState({
//     "cartOrderDtoList" : [
//       {"cartCourseNo" : }
//     ]
//   })
//   const [data, setData] = useState();
//   const [datalist, setDatalist]  = useState({
//     "cartCourseNo" : ""
//   } )
//  console.log(datalist);

   


  
   const OrderCourseList = async () => {



    await axios
      .post(baseUrl + "/cart/orders", )
      .then(function (res) {
        if (res.status === 200) {
          window.alert("전송 성공");
        }
      })
      .catch(function (err) {
        window.alert("실패 " + err);
      });
   };




  useEffect(() => {
    setTotalprice(0);
    let totalP = 0;
    let totalDiscount = 0;
    checkedList.map(item => totalP +=(item.coursePrice *1))
    checkedList.map(item => totalDiscount += item.discount)
    setTotalprice(totalP - (totalP * ((totalDiscount/checkedList.length || 0) / 100)))
  
  }, [checkedList, totalprice, courses])

  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];
         courses.forEach((list) => checkedListArray.push(list));
        setCheckedLists(checkedListArray);   
      } else {
        setCheckedLists([]);
        
      }
    },
    [courses]
  );
  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedLists([...checkedList, list]);
        
       
      } else {
        setCheckedLists(checkedList.filter((el) => el !== list.cartCourseNo));
        
      }
    },
    [checkedList]

   
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
      <h2 className="title">수강바구니</h2>
     
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
                  checked={checkedList.includes(list) ? true : false}
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
      <Button variant="contained" disableElevation>
      장바구니 담기
    </Button><br/>
    <Button variant="contained" color="success" onClick={OrderCourseList} >
       주문하기
      </Button>
      <hr />
      </div>
      </div>
    </>
  );
}


