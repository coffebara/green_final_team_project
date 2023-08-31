import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
export default function CourseList() {
  // 카트 리스트를 조회하는 axios
  const baseUrl = "http://localhost:9090";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get(baseUrl + "/cart");
      console.log(response);
      setCourses(response.data.cartCources);
    };
    getCourses();
  }, []);

  return (
    <>
      <h2>강의 리스트</h2>
      <CartListTable courses={courses} />
    </>
  );
}

const CartListTable = ({ courses }) => {
  const [checkedList, setCheckedLists] = useState([]);
  console.log(checkedList);
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
        setCheckedLists(checkedList.filter((el) => el !== list));
      }
    },
    [checkedList]
  );

  const baseUrl = "http://localhost:9090";

  // const [cartOrderDtoList, setCartOrderDtoList] = useState({
  //     cartCourseNo : '25',
  // })

  let cartOrderDtoList = [
   
    { cartCourseNo: 24 },
    { cartCourseNo: 25 },
    { cartCourseNo: 26 },
  ];

  let paramData = {"cartOrderDtoList":[
   
    { cartCourseNo: 24 },
    { cartCourseNo: 25 },
    { cartCourseNo: 26 },
  ]};
  const OrderCourselist = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // for (const key in cartOrderDtoList) {
    //     formData.append(key, cartOrderDtoList[key]);
    // }

    await axios
      .post(baseUrl + "/cart/orders", paramData)
      .then(function (res) {
        if (res.status === 200) {
          window.alert("전송 성공");
        }
      })
      .catch(function (err) {
        window.alert("실패 " + err);
      });
  };

  // const OrderCourselist = (e) => {
  //  axios.post("http://localhost:9090/cart/orders", {

  //     cartCourseNo : checkedList.cartCourceNo,
  //     cartCourseDtoList : checkedList

  //   })
  //   .then((response) => {

  //       console.log("200", response.data);

  //       if (response.status === 200) {
  //           alert('카트 리스트 주문 성공');
  //           console.log("주문 성공");

  //       }
  //   })
  //   .catch((error) => console.log(error.response));

  //   };

  let navigate = useNavigate();

  return (
    <>
      <table className="courseListTable">
        <thead>
          <tr>
            <th>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => onCheckedAll(e.target.checked)}
                checked={
                  checkedList.length === 0
                    ? false
                    : checkedList.length === courses.length
                    ? true
                    : false
                }
              />
            </th>
            <th></th>
            <th>번호</th>
            <th>강의 명</th>
            <th>가격</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {courses.map((list, index) => (
            <tr key={index}>
              <td>
                <input
                  key={list.id}
                  type="checkbox"
                  onChange={(e) => onCheckedElement(e.target.checked, list)}
                  checked={checkedList.includes(list) ? true : false}
                />
              </td>
              <td>{index}</td>
              <td>{list.cartCourseNo}</td>
              <td>{list.courseTitle}</td>
              <td>{list.coursePrice}</td>
              <td>
                <button>취소</button>
              </td>
              <td>
                <button onClick={OrderCourselist}>주문하기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
