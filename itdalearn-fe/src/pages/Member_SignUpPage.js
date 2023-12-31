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
    memberEmail: "",
    memberTel: "",
  });

  const handleSignUp = (e) => {
    setMemberSignUp({
      ...memberSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const onClickSignUp = (event) => {
    axios
      .post("http://localhost:9090/members", {
        memberNo: memberSignUp.memberNo,
        memberPwd: memberSignUp.memberPwd,
        memberName: memberSignUp.memberName,
        memberEmail: memberSignUp.memberEmail,
        memberTel: memberSignUp.memberTel,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("회원가입에 성공했습니다.");
          navigate("/members/login");
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (memberSignUp.memberPwd !== memberSignUp.memberPwdCheck) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 입력해주세요.");
      event.preventDefault();
      return;
    }
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
          <Box noValidate sx={{ mt: 3 }}>
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
                  type="password"
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
                  type="password"
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
                  value={memberSignUp.memberEmail}
                  name="memberEmail"
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

              <Grid item xs={12}></Grid>
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