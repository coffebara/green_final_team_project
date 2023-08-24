/* eslint-disable */

import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";


export default function Course() {
 
    let { id } = useParams();
  

    const baseUrl = "http://localhost:9090";
    const [course, setCourse] = useState([]);
    
    useEffect(() => {
        
        const getCourses = async () => {
            const response = await axios.get(baseUrl + "/course/"+id);
          
            console.log(response.data.course);
            setCourse(response.data.course);
           
        };
        getCourses();
    }, []);

    const addCartItem = () => {
        
        console.log("상품아이디" + id);
        axios.post("http://localhost:9090/cart", {
        
         courseNo : id,
          
      })
      .then((response) => {
        console.log("카트담기 성공");
          console.log("200", response.data);
       
      
          if (response.status === 200) {
              alert('장바구니 담기에 성공하였습니다.');
              console.log("카트담기 성공");
             
          }
      })
      .catch((error) => console.log(error.response));
      
      };

      const OrderCourse = () => {
        console.log(id);
        console.log(course.courseTitle);
        console.log(course.coursePrice)
        axios.post("http://localhost:9090/order", {
        
         courseNo : id,
          
      })
      .then((response) => {
    
          console.log("200", response.data);
       
      
          if (response.status === 200) {
              alert('주문 되었습니다. ');
              console.log("주문하기 성공");
             
          }
      })
      .catch((error) => console.log(error.response));
      
      };

    let navigate = useNavigate();   

    return (

        <div>
            <h2>강의 상세보기</h2>
        <p>강의 번호 : {id}</p>
        <p >강의명 : {course.courseTitle}</p>
        <p> 강사 : {course.courseTeacher}</p>
        <p> 카테고리 : {course.courseCategory} </p>
        <p> 강의 난이도 : {course.courseLevel} </p>
        <p> 가격 : {course.coursePrice} </p>
        <p> 상세 설명 : {course.courseDec}</p>   
        <button onClick={() => {
                        navigate(`/courselist`);
                    }}>강의리스트</button>
        <button className="btnitdtl" onClick={() => addCartItem()}>장바구니 담기</button>
     
        <button onClick={() => OrderCourse()}>주문 하기</button>
        </div>
    );

}
   
