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
      <H1>회원가입</H1>
      <form>
        <Div>
          <Span>아이디</Span>
          <span>아이디로 사용할 이메일을 입력해 주세요.</span>
          <input id="id" type="text" placeholder="abc@google.com" />
        </Div>
        <Div>
          <Span>비밀번호</Span>
          <input
            id="password"
            type="password"
            placeholder="8글자 이상 입력해 주세요"
          />
        </Div>
        <Div>
          <Span>직업</Span>
          <Flexdiv>
            {jobList.map((job, index) => (
              <Label htmlFor={job} key={index}>
                {job}
                <HiddenInput type="radio" id={job} name="job" value={job} />
              </Label>
            ))}
          </Flexdiv>
        </Div>
        <Div>
          <span>지역</span>
          <select id="address">
            {addressList.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
            <option>지역</option>
          </select>
        </Div>
        <Div>
          <Span>선호 은행</Span>
          <select id="address">
            {bankList.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </Div>
        <Span>추천받고싶은 상품</Span>
        <Flexdiv>
          {recommendList.map((list, index) => (
            <Label htmlFor={list} key={index}>
              {list}
              <input type="radio" name="recommend" id={list} value={list} />
            </Label>
          ))}
        </Flexdiv>
        <button type="submit">회원가입</button>
      </form>
    </Main>
  );
};

const Main = styled.main`
  width: 500px;
  height: 1000px;
  margin: auto;
  box-sizing: border-box;
  padding: 30px;
  background-color: beige;
`;
const H1 = styled.h1`
  margin: 30px 0;
  font-size: 30px;
`;

const Div = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Label = styled.label`
  font-weight: 700;
  width: 300px;
  background-color: black;
  color: white;
`;
const Span = styled.span`
  font-color: blue;
`;
const Flexdiv = styled.div`
  display: flex;
  gap: 5px;
`;
const HiddenInput = styled.input`
  // visibility: hidden;
`;
export default SignUp;
