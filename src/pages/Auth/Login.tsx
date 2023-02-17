import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Main, SubmitButton, Div, CategoryTitle } from './SignUp';
import { useNavigate } from 'react-router-dom';
import { IoMailOutline } from 'react-icons/io5';
import { SlLock } from 'react-icons/sl';
import { requestLogin } from '../../api/api';

interface LoginForm {
  id: string;
  pw: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  return (
    <Main>
      <Div>
        <img
          src="/logo_fincok.png"
          style={{ margin: '30px auto', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
      </Div>
      <h1 style={{ padding: '30px 0 50px' }}>Login</h1>
      {/* <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}> */}
      <form onSubmit={handleSubmit((data) => requestLogin(data.id, data.pw))}>
        <Div>
          <div>
            <CategoryTitle>아이디</CategoryTitle>
            {errors?.id ? (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.id?.message}
              </span>
            ) : null}
          </div>
          <div style={{ position: 'relative' }}>
            <IoMailOutline style={{ position: 'absolute', top: '20px', left: '20px' }} />
            <input
              id="id"
              type="text"
              placeholder="abc@google.com"
              style={{ width: '380px', paddingLeft: '45px' }}
              {...register('id', {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
                required: '필수 입력란입니다.',
              })}
            />
          </div>
        </Div>
        <Div>
          <div>
            <CategoryTitle>비밀번호</CategoryTitle>
            {errors?.pw ? (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.pw?.message}
              </span>
            ) : null}
          </div>
          <div style={{ position: 'relative' }}>
            <SlLock style={{ position: 'absolute', top: '20px', left: '20px' }} />
            <input
              id="pw"
              type="password"
              placeholder="8글자 이상 입력해 주세요"
              style={{ width: '380px', paddingLeft: '45px' }}
              {...register('pw', {
                minLength: {
                  value: 8,
                  message: '8글자 이상 입력해주세요.',
                },
                required: '필수 입력란입니다.',
              })}
            />
          </div>
        </Div>
        <SubmitButton type="submit">로그인</SubmitButton>
      </form>
      <Flexdiv>
        <NavSpan onClick={() => navigate('/auth/findpassword')}>비밀번호 찾기</NavSpan> /{' '}
        <NavSpan onClick={() => navigate('/auth/signup')}>회원가입</NavSpan>
      </Flexdiv>
    </Main>
  );
};

const Flexdiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const NavSpan = styled.span`
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

export default Login;
