import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function MemberMyPage() {
  const imageStyle = {
    width: 140,
    height: 50,
    marginTop: 40,
    marginBottom: 10,
  };

  const navigate = useNavigate();
  const [id, setId] = useState(null);

  const [MemberMyPage, setMemberMyPage] = useState({
    memberNo: "",
    memberPwd: "",
    memberName: "",
    memberEmail: "",
    memberTel: "",
  });

  const handleMypage = (e) => {
    setMember({
      ...member,
      member: {
        ...member.member,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onClickChangeMember = (e) => {
    e.preventDefault();
    alert("수정에 성공하였습니다.");
    navigate("/");
    const data = {
      id: id,
      memberNo: member.member.memberNo,
      memberPwd: member.member.memberPwd,
      memberName: member.member.memberName,
      memberEmail: member.member.memberEmail,
      memberTel: member.member.memberTel,
    };

    const token = localStorage.getItem("token");

    if (id !== null) {
      const url = `http://localhost:9090/members/mypage/${id}`;
      console.log("Request URL:", url); // <-- 로그 추가

      axios
        .patch(url, data, { headers: { Authorization: token } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("수정에 성공하였습니다.");

            // Update local storage with the returned member data
            localStorage.setItem("token", JSON.stringify(response.data));

            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 유저 정보 백엔드에서 갖고오기

  const [member, setMember] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:9090/members/mypage", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setMember(response.data);
          setId(response.data.member.id); // member 객체 내부의 id 값을 가져옵니다.
        })

        .catch((error) => console.error(error));
    }
  }, []);

  if (!member) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: 4 }}>
            회원정보 수정
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="memberNo"
                  onChange={handleMypage}
                  value={member.member.memberNo}
                  placeholder="아이디"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleMypage}
                  name="memberPwd"
                  type="password"
                  placeholder="새 비밀번호 입력"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="memberName"
                  fullWidth
                  onChange={handleMypage}
                  value={member.member.memberName}
                  placeholder="이름"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleMypage}
                  value={member.member.memberEmail}
                  name="memberEmail"
                  placeholder="이메일"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="memberTel"
                  onChange={handleMypage}
                  value={member.member.memberTel}
                  placeholder="전화번호"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ fontSize: 18 }}
              onClick={onClickChangeMember}
            >
              수정하기
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
