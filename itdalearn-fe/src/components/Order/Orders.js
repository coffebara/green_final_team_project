import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../../styles/Order.css'
import { useCallback } from 'react';


export default function Orders() {

    let navigate = useNavigate();
    const baseUrl = "http://localhost:9090";
    const [courses, setCourses] = useState([]);

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
      const response = await axios.get(baseUrl + "/orders"); 
      console.log(response)
      setCourses(response.data.orders);
      console.log(response.data.orders.orderCourseDtoList);
    };
    
  useEffect(()=>{
    getCourses();
  },[])


  const deleteorder = () => {
    
    axios.post("http://localhost:9090/order/" + checkedList[0].orderNo + "/cancel", {
    
    orderNo : checkedList[0].orderNo,
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
  
  return (
    <>
     <div className='orderstable'>
    <React.Fragment>
      <Title>최근 구매내역</Title>
      <br />
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
        {courses.map((item, i) => (
            <TableRow key={i}>
              <TableCell><input
                  key={i}
                  type="checkbox"
                  onChange={(e) => onCheckedElement(e.target.checked, item)}
                  checked={checkedList.includes(item) ? true : false}
                /></TableCell>
              <TableCell><img className='orderimg' src={item.orderCourseDtoList[0].imgUrl} /></TableCell>
              <TableCell>{item.orderCourseDtoList[0].courseTitle}</TableCell>
              <TableCell>{item.orderCourseDtoList[0].coursePrice}</TableCell>
              <TableCell>{item.orderDate}</TableCell>
              <TableCell align="right">{item.orderStatus}</TableCell>
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