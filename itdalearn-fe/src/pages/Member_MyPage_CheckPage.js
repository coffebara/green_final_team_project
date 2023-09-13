import * as React from "react";
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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setRoles } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../common/Nav";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const imageStyle = {
    width: 150,
    height: 50,
    marginTop: 40,
  };

  const controlLableStrle = {
    float: "left",
  };

  const navigate = useNavigate();

  const [memberRePwd, setmemberRePwd] = useState({
    memberPwd: "",
  });

  const handleRePwd = (e) => {
    setmemberRePwd({
      ...memberRePwd,
      [e.target.name]: e.target.value,
    });
  };

  const token = localStorage.getItem("token");

  const onClickFindPwd = () => {
    axios
      .post(
        "http://localhost:9090/members/mypage/check",
        {
          memberPwd: memberRePwd.memberPwd,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // 서버로부터 HTTP 200 응답을 받았다면,
          alert("인증되었습니다");
          navigate("/members/mypage"); // 사용자를 /members/mypage 로 리다이렉션합니다.
        } else {
          // 그 외의 경우(예: HTTP 401),
          alert("비밀번호가 다릅니다"); // 오류 메시지를 출력합니다.
        }
      })
      .catch((error) => {
        alert("비밀번호가 다릅니다");
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ marginTop: 15, marginBottom: 8 }}
          >
            비밀번호를 입력해주세요
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="memberPwd"
              value={memberRePwd.memberPwd}
              onChange={handleRePwd}
              placeholder="비밀번호 입력"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ fontSize: 18 }}
              onClick={onClickFindPwd}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}