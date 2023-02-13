import React from 'react';
import styled from 'styled-components';

const SignUp = () => {
  const jobList = ['무직', '학생', '군인', '자영업자', '전문직', '일반 직장인'];
  const addressList = [
    '강원도',
    '경기도',
    '경상남도',
    '경상북도',
    '광주광역시',
    '대구광역시',
    '대전광역시',
    '부산광역시',
    '서울특별시',
    '세종특별자치시',
    '울산광역시',
    '인천광역시',
    '전라남도',
    '전라북도',
    '제주특별자치도',
    '충청남도',
    '충청북도',
  ];
  const bankList = [
    '국민은행',
    '광주은행',
    '농협은행',
    '대구은행',
    '부산은행',
    '수협은행',
    '신한은행',
    '우리은행',
    '중소기업은행',
    '하나은행',
    '한국스탠다드차타드은행',
    '한국씨티은행',
  ];
  const recommendList = ['적금', '정기예금', '전세자금대출', '주택담보대출'];

  return (
    <Main className="signUpMain">
      <Div>
        <img
          src="../../../public/logo_fincok.png"
          style={{ margin: '20px auto' }}
        />
      </Div>
      <h1 style={{ paddingBottom: '20px' }}>Sign up</h1>
      <form>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>아이디</CategoryTitle>
            <span style={{ marginLeft: '10px', color: '#f74440' }}>
              아이디로 사용할 이메일을 입력해 주세요.
            </span>
          </div>
          <input id="id" type="text" placeholder="abc@google.com" />
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>비밀번호</CategoryTitle>
          </div>
          <input
            id="password"
            type="password"
            placeholder="8글자 이상 입력해 주세요"
          />
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>직업</CategoryTitle>
          </div>
          <RadioDiv>
            {jobList.map((job, index) => (
              <Label htmlFor={job} key={index}>
                {job}
                <input
                  type="radio"
                  id={job}
                  name="job"
                  value={job}
                  style={{ display: 'none' }}
                />
              </Label>
            ))}
          </RadioDiv>
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>지역</CategoryTitle>
          </div>
          <select id="address">
            {addressList.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>선호 은행</CategoryTitle>
          </div>
          <select id="bank">
            {bankList.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>관심있는 상품</CategoryTitle>
          </div>
          <RadioDiv>
            {recommendList.map((list, index) => (
              <Label htmlFor={list} key={index}>
                {list}
                <input
                  type="radio"
                  name="recommend"
                  id={list}
                  value={list}
                  style={{ display: 'none' }}
                />
              </Label>
            ))}
          </RadioDiv>
        </Div>
        <SubmitButton
          type="submit"
          onClick={() => {
            window.confirm('');
          }}
        >
          회원가입
        </SubmitButton>
      </form>
    </Main>
  );
};

const Main = styled.main`
  width: 500px;
  margin: auto;
  box-sizing: border-box;
  padding: 30px;
`;
const Div = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Required = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-right: 5px;
  color: #f74440;
`;
const Label = styled.label`
  font-size: 20px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  margin: auto;
  text-align: center;
  font-weight: 600;
  background-color: var(--color-background);
  border: 1px solid var(--color-stroke);
  border-radius: 8px;

  :hover {
    background-color: black;
    color: white;
  }
`;
const CategoryTitle = styled.span`
  display: inline-block;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
`;
const RadioDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const SubmitButton = styled.button`
  width: 400px;
  margin: 50px auto;
  font-size: 20px;
`;
export default SignUp;
