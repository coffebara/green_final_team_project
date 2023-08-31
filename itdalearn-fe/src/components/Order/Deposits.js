import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>최근 학습 내역</Title>
      <Typography component="p" variant="h7" >
        최근에 학습한 강의가 없습니다. 
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       최근 시각 찍히게 하면 좋을 듯
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          강의 보러 가기
        </Link>
      </div>
    </React.Fragment>
  );
}