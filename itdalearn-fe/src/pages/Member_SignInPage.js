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
import jwt_decode from 'jwt-decode';
import {setRoles} from '../store';
import { useDispatch, useSelector  } from "react-redux";

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
  const dispatch = useDispatch();
  let roles = useSelector(state => state.userRoles)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  const imageStyle = {
    width: 150,
    height: 50,
    marginTop: 40,
    marginBottom: 10,
  };

  const controlLableStrle = {
    float: "left",
  };

    const [memberSignIn, setMemberSignIn] = useState({
      memberNo: "",
      memberPwd: "",
    });

    const handleSignIn = (e) => {
        setMemberSignIn({
          ...memberSignIn,
          [e.target.name]: e.target.value,
        });
      };

  const navigate = useNavigate();

const onClickSignIn = () => {
  axios
    .post("http://localhost:9090/login", {
      memberNo: memberSignIn.memberNo,
      memberPwd: memberSignIn.memberPwd,
    })
    .then((response) => {
      const jwtToken = response.headers['authorization'];
      console.log('jwtToken: ' + jwtToken) // 받아온 토큰
      localStorage.setItem("token", jwtToken)
      let decode =  jwt_decode(jwtToken) // 토큰을 디코드함함
      console.log(decode)
      // dispatch(setRoles(decode.role[0]))
      // 로그인 요청이 성공하면, 여기서 페이지 이동을 합니다.
      navigate("/");
    })
    .catch((error) => console.log(error));

};
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
          <img
            src={process.env.PUBLIC_URL + "/favicon.ico"}
            style={imageStyle}
            onClick={() => {
              navigate("/");
            }}
          />
          <Typography component="h1" variant="h5" />
          <Box
            noValidate
            sx={{ mt: 1 }}
          >
              <TextField
                margin="normal"
                required
                fullWidth
                label="아이디"
                name="memberNo"
                value={memberSignIn.memberNo}
                onChange={handleSignIn}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="memberPwd"
                value={memberSignIn.memberPwd}
                onChange={handleSignIn}
                label="비밀번호"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="로그인 상태 유지"
                style={controlLableStrle}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ fontSize: 18 }}
                onClick={onClickSignIn}
              >
                로그인
              </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="#" variant="body2">
                  아이디 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/members" variant="body2">
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}