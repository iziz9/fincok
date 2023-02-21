import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ height: '80vh', textAlign: 'center' }}>
      <H1>유효한 경로가 아닙니다.</H1>
      <img src="/6333070.jpg" style={{ width: '400px', marginTop: '50px' }} />
      <button style={{ margin: '30px auto' }} onClick={() => navigate('/')}>
        메인으로 돌아가기
      </button>
    </div>
  );
};

const H1 = styled.h1`
  font-size: 30px;
  padding-top: 50px;
`;

export default NotFound;
