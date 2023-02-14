import React from 'react';
import styled from 'styled-components';

const SignIn = () => {
  return (
    <Main className="signUpMain">
      <Div>
        <img
          src="../../../public/logo_fincok.png"
          style={{ margin: '30px auto' }}
        />
      </Div>
      <h1>Login</h1>
      <form>
        <SubmitButton type="submit">로그인</SubmitButton>
      </form>
    </Main>
  );
};

const Main = styled.main`
  width: 500px;
  height: 1800px;
  margin: auto;
  box-sizing: border-box;
  padding: 30px;
  background-color: beige;
`;
const Div = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const HiddenInput = styled.input`
  // visibility: hidden;
`;
const Label = styled.label`
  font-size: 20px;
  width: 300px;
  background-color: blue;
  color: white;

  ${HiddenInput}:checked {
    background-color: red;
  }
`;
const CategoryTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
const Flexdiv = styled.div`
  display: flex;
  gap: 5px;
`;
const SubmitButton = styled.button`
  width: 90%;
  margin: 30px auto;
`;

export default SignIn;
