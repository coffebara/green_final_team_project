import '../../styles/Order.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useCallback } from 'react';


export default function Orders() {

    let navigate = useNavigate();
    const baseUrl = "http://localhost:9090";
    const [courses, setCourses] = useState([]);
    const [orderCourseDtoList, setOrderCourseDtoList] = useState([]);

    const [checkedList, setCheckedLists] = useState([]);

    const onCheckedElement = useCallback(
      (checked, item) => {
        if (checked) {
          setCheckedLists([...checkedList, item]);
        } else {
          setCheckedLists(checkedList.filter((el) => el !== item));
        }
      },
      [checkedList]
    );


   
  
    const getCourses = async () => {
      const response = await axios.get(baseUrl + "/orders",
      {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    }); 
      console.log(response)
      setCourses(response.data.orders);
    
      console.log(orderCourseDtoList);
    };
    
  useEffect(()=>{
    getCourses();
  },[])


   const deleteorder = () => {
    
    axios.post("http://localhost:9090/order/" + checkedList[0].orderNo + "/cancel", {
    
    orderNo : checkedList[0].orderNo,
  },
  {
    headers: {
        Authorization: localStorage.getItem("token"),
    },
})
  
  .then((response) => {
    console.log("주문 취소 성공");
      console.log("200", response.data);
      getCourses();
   
  
      if (response.status === 200) {
          alert('주문이 취소되었습니다.');
         
         
      }
  })
  .catch((error) => console.log(error.response));
  
   };



   const [filterPeriod, setFilterPeriod] = useState('all');

   const handleFilterChange = (event) => {
    setFilterPeriod(event.target.value);
   }


 const filteredData = 
    filterPeriod === 'all' ? courses : courses.filter((item) => {
      const currentDate = new Date();
      console.log(currentDate);
      if(filterPeriod === 'oneMonth'){
        return item.orderDate >= new Date(currentDate.getFullYear(), currentDate.getMonth() -1, currentDate.getDate());
      } else if( filterPeriod === 'sixMonths') {
        return item.orderDate >= new Date(currentDate.getFullYear(), currentDate.getMonth()-6, currentDate.getDate());
      } else if( filterPeriod === 'oneYear') {
        return item.orderDate >= new Date(currentDate.getFullYear() -1, currentDate.getMonth(), currentDate.getDate());
      }
    });
    
 console.log(filteredData);
  return (
    <>
     <div className='orderstable'>
    <React.Fragment>
      <Title>최근 구매내역</Title>
      <br />
      <select value={filterPeriod} onChange={handleFilterChange}>
         <option value="all">전체</option>
         <option value="oneMonth">1개월 전</option>
         <option value="sixMonths">6개월 전</option>
         <option value="oneYear">1년 전</option>
       </select>
      <Table size="small">
       
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>강의명</TableCell>
            <TableCell>가격</TableCell>
            <TableCell>구매날짜</TableCell>
            <TableCell align="right">구매상태</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        {filteredData.map((order, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  key={index}
                  type="checkbox"
                  onChange={(e) => onCheckedElement(e.target.checked, order)}
                  checked={checkedList.includes(order) ? true : false}
                /></TableCell>


              {order.orderCourseDtoList.map((course, courseIndex) => (
              <div key={courseIndex}>
              <TableCell><img className='orderimg' src={course.imgUrl} /></TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell>{course.coursePrice}원</TableCell>     
              </div>
                     
            ))} 
              <TableCell>{order.orderDate}</TableCell>
              <TableCell align="right">{order.orderStatus}</TableCell>
              <TableCell align="right">
              <Button onClick={deleteorder} variant="outlined">주문 취소</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
    </React.Fragment>
    </div>
    </>
  );
}