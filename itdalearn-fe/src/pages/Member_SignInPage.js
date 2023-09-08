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

  const [memberNo, setMemberNo] = useState("");
  const [memberPwd, setMemberPwd] = useState("");

  const handleMemberNo = (e) => {
    setMemberNo(e.target.value);
  };

  const handleMemberPwd = (e) => {
    setMemberPwd(e.target.value);
  };

  const navigate = useNavigate();

  const onClickSignIn = () => {
    axios
      .post("http://localhost:9090/login",
        {
          memberNo: memberNo,
          memberPwd: memberPwd,
        },
      ).catch(error => console.log(error))
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
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <form action="/login" method="post">
              <TextField
                margin="normal"
                required
                fullWidth
                label="아이디"
                name="memberNo"
                value={memberNo}
                onChange={handleMemberNo}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="memberPwd"
                value={memberPwd}
                onChange={handleMemberPwd}
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
            </form>
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