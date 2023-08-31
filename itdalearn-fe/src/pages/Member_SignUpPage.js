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

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const imageStyle = {
    width: 150,
    height: 50,
    marginTop: 40,
    marginBottom: 10,
  };

  const navigate = useNavigate();

  const [memberSignUp, setMemberSignUp] = useState({
    memberNo: "",
    memberPwd: "",
    memberPwdCheck: "",
    memberName: "",
    email: "",
    memberTel: "",
  });

  const handleSignUp = (e) => {
    setMemberSignUp({
      ...memberSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const onClickSignUp = () => {
    axios
      .post("http://localhost:9090/members",
        {
          memberNo: memberSignUp.memberNo,
          memberPwd: memberSignUp.memberPwd,
          memberName: memberSignUp.memberName,
          email: memberSignUp.email,
          memberTel: memberSignUp.memberTel,
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <form method="post">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="memberNo"
                    label="아이디"
                    onChange={handleSignUp}
                    value={memberSignUp.memberNo}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="memberPwd"
                    label="비밀번호"
                    onChange={handleSignUp}
                    value={memberSignUp.memberPwd}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="memberPwdCheck"
                    label="비밀번호 확인"
                    onChange={handleSignUp}
                    value={memberSignUp.memberPwdCheck}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="memberName"
                    required
                    fullWidth
                    label="이름"
                    onChange={handleSignUp}
                    value={memberSignUp.memberName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="이메일"
                    onChange={handleSignUp}
                    value={memberSignUp.email}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="memberTel"
                    label="전화번호"
                    onChange={handleSignUp}
                    value={memberSignUp.memberTel}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="이메일을 통해 마케팅 프로모션 및 업데이트를 받고 싶습니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ fontSize: 18 }}
                onClick={onClickSignUp}
              >
                회원가입
              </Button>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/members/login" variant="body2">
                  이미 계정이 있습니까? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}