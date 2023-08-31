import * as React from 'react';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import Admin_CoursePagination from '../Admin/Admin_CoursePagination';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";	// 추가
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CartList.css";
import "../../styles/Index.css";
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
SwiperCore.use([Navigation, Pagination, Autoplay])	



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme(
    {
        palette: {
          primary: {
            light: '#ff7043',
            main: '#00897b',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#ff7043',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },
      }
);

export default function Index() {

    const baseUrl = "http://localhost:9090";
    const [courses, setCourses] = useState([]);
    const [currPage, setCurrPage] = useState(1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(0); // 총 페이지
    const [displayPageNum, setDisplayPageNum] = useState([]); // 페이지네이션 숫자
    const [pageSize, setPageSize] = useState(0); // 한 페이지 글 개수
    const [inputs, setInputs] = useState({
      // api 요청할 데이터
      page: 1,
      searchBy: "",
      searchQuery: "",
  });
     let navigate = useNavigate();
    
    // useEffect(() => {
    //     const getCourses = async () => {
    //         const response = await axios.get(baseUrl + "/courses");
    //         console.log(response);
    //         setCourses(response.data.courseList);
    //         console.log(courses);
    //     };
    //     getCourses();
    // }, []);


    const getCourseList = async () => {
      const postPage = inputs.page - 1; // pageable객체는 page가 0부터 시작하므로
      const queryString =
          "/" + postPage + "?&searchBy=" + inputs.searchBy + "&searchQuery=" + inputs.searchQuery;
      try {
          const response = await axios.get(baseUrl + "/main" + queryString);
         
          const { courseList } = response.data;
          console.log(courseList);
          console.log(courseList.content[0].imgUrl);
          const { content, number, size, totalPages } = courseList; // 강의리스트, 현재페이지, 페이지당강의수, 총페이지
          setCourses(content);
          setCurrPage(number + 1);
          setTotalPage(totalPages);
          setPageSize(size);
      } catch (error) {
          console.log(error);
      }
  };

  // 페이지 변경 시 강의 리스트 호출
  useEffect(() => {
      getCourseList();
  }, [inputs.page]);

  useEffect(() => {
    const getDisplayPageNum = () => {
        let startPage = Math.floor((currPage - 1) / pageSize) * pageSize + 1;
        let endPage = startPage + pageSize - 1;

        if (startPage <= 0) {
            startPage = 1;
            endPage = pageSize;
        }
        if (endPage > totalPage) {
            endPage = totalPage;
        }

        const tmpPages = [];
        for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
        }
        setDisplayPageNum(tmpPages);
    };
    getDisplayPageNum();
}, [currPage, totalPage]);
// 페이지네이션 버튼 클릭 이벤트
const handlerClickBtn = (e) => {
  let value = e.target.text;
  setInputs({
      ...inputs,
      page: value,
  });
};
// '<' -10페이지 이동
const previousPage = () => {
  if (currPage > 1) {
      setInputs({
          ...inputs,
          page: Math.floor((currPage - 11) / pageSize) * pageSize + 1,
      });
  }
};
// '>' +10페이지 이동
const nextPage = () => {
  if (currPage < totalPage) {
      setInputs({
          ...inputs,
          page: Math.round((currPage + (pageSize / 2 - 1)) / pageSize) * pageSize + 1,
      });
  }
};
// 첫 페이지로 이동
const firstPage = () => {
  setInputs({
      ...inputs,
      page: 1,
  });
};
// 마지막 페이지로 이동
const lastPage = () => {
  setInputs({
      ...inputs,
      page: totalPage,
  });
};
// 검색 입력값 받기
const handleOnChange = (e) => {
  setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
  });
};

// 검색 버튼
const handleSubmit = (e) => {
  e.preventDefault();
  if (inputs.searchBy !== "" && inputs.searchQuery !== "") {
      setInputs({
          ...inputs,
          page: 1,
      });
      getCourseList();
  }
};


  return (
   
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>    
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
 <div className='bannerImg'>
      <Swiper
        className="banner"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}	// 추가
      >
        <SwiperSlide><img src='banner1.png' alt='banner1'/></SwiperSlide>
        <SwiperSlide><img src='banner2.png' alt='banne2'/></SwiperSlide>
        <SwiperSlide><img src='banner3.png'alt='banner3'/></SwiperSlide>
        <SwiperSlide><img src='banner4.png'alt='banner4'/></SwiperSlide>
        <SwiperSlide><img src='banner5.png'alt='banner5'/></SwiperSlide>
        <SwiperSlide><img src='banner6.png'alt='banner5'/></SwiperSlide>
      </Swiper>
    </div>
        </Box>

<div className='buttongroup'>

        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>스프링부트</Button>
        <Button>입문</Button>
        <Button>HTML</Button>
        <Button>리액트</Button>
        <Button>풀스택</Button>
        <Button>JPA</Button>
        <Button>CSS</Button>
        <Button>Node.js</Button>
        <Button>자바스크립트</Button>
        <Button>SQL</Button>
      </ButtonGroup>

    </Box>
</div>
<div className='icon'>
<Stack direction="row" spacing={2}>   
      <Avatar sx={{ bgcolor: green[500] }}>
        <PageviewIcon />
      </Avatar> 
    </Stack> </div>
<div className='searchbox'>
<Box
    sx={{
      width: 500,
      maxWidth: '100%',
      
    }}
  >
   
   <form onSubmit={handleSubmit}>
                <div className="form-inline justify-content-center">
                    <div>
                        <select className="form-control" name="searchBy" onChange={handleOnChange}>
                            <option value="">- 검색 방법 선택 -</option>
                            <option value="courseTitle">상품명</option>
                            <option value="courseTeacher">강사명</option>
                        </select>
                    </div>
                    <input
                        name="searchQuery"
                        type="text"
                        className="form-control"
                        placeholder="검색어를 입력해주세요"
                        onChange={handleOnChange}
                    />
                    <div className='searchbtn'>
                    <button id="searchBtn" type="submit" className="btn btn-primary">
                        검색
                    </button></div>
                </div>
            </form>
  </Box>
      </div>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

                {courses.map((item, i, card) => (
                     <Grid item key={i} xs={12} sm={6} md={4}>
                        <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={courses[i].imgUrl}
                    onClick={() => {
                      navigate(`/course/${item.courseNo}`);
                  }}
                  style={{ cursor: "pointer"}}
                  />
                  <CardContent key={i} sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2"
                    >
                    <div className='maintitle'>{item.courseTitle}</div>
                    </Typography>
                    <Typography>
                        <div className='mainbody'>
                        <div>{item.courseTeacher}</div>
                        <div>₩{item.coursePrice}원</div>
                        <div>{item.courseDec}</div>
                        </div>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className='button'>
                    <Button size="small" onClick={() => {
                        navigate(`/course/${item.courseNo}`);
                    }}>View</Button>
                    </div>
                  </CardActions>
                    </Grid>
                ))}

          </Grid>
          <div className='pagenation'>
          <Admin_CoursePagination
                    displayPageNum={displayPageNum}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    handlerClickBtn={handlerClickBtn}
                    currPage={currPage}
                    firstPage={firstPage}
                    lastPage={lastPage}
                    totalPage={totalPage}
                   
                /></div>
        </Container>
   
      </main>
  
    </ThemeProvider>
    
  );
}