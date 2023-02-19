import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Main, SubmitButton, Div, CategoryTitle } from './SignUp';
import { useNavigate } from 'react-router-dom';
import { IoMailOutline } from 'react-icons/io5';

type SigninForm = {
  id: string;
};

const FindPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>();

  const navigate = useNavigate();

  return (
    <Main>
      <Div>
        <img
          src="/logo_fincok.png"
          style={{ margin: '20px auto', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
      </Div>
      <Flexdiv>
        <h1 style={{ margin: '0 0 30px', color: '#f74440', fontSize: '30px' }}>비밀번호 찾기</h1>
      </Flexdiv>
      <FlexText>
        핀콕에 가입했던 이메일주소를 입력해주세요. <br />
        비밀번호 재설정 메일을 보내드립니다.
      </FlexText>
      <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
        <Div>
          <div>
            <CategoryTitle>아이디</CategoryTitle>
            {errors?.id ? (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.id?.message}
              </span>
            ) : null}
          </div>
          <div style={{ position: 'relative', marginBottom: '30px' }}>
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
        <SubmitButton type="submit">비밀번호 재설정하기</SubmitButton>
      </form>
    </Main>
  );
};

const Flexdiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  text-align: center;
`;

const FlexText = styled(Flexdiv)`
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  margin: 20px 0 50px;
`;

export default FindPassword;
