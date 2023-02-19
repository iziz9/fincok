import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { productList, jobList, bankList, addressList } from '../../utils/list';
import { requestSignUp } from '../../api/api';
import { checkIdAvailable } from '../../api/api';

interface SignupForm {
  name: string;
  memberId: string;
  password: string;
  checkPw?: string;
  year: string;
  month: string;
  date: string;
  job: string;
  district: string;
  bank: string;
  category: string;
}

const SignUp = () => {
  const formSchema = yup.object({
    name: yup
      .string()
      .required('필수 입력란입니다.')
      .matches(/^[가-힣]+$/, '이름을 정확히 입력해주세요.')
      .min(2, '이름을 정확히 입력해주세요.'),
    memberId: yup.string().required('필수 입력란입니다.').email('이메일 형식에 맞지 않습니다.'),
    password: yup
      .string()
      .required('필수 입력란입니다.')
      .min(8, '영문, 숫자 포함 8자 이상 입력해주세요.')
      .max(15, '최대 15자까지 입력 가능합니다.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/, '영문, 숫자를 모두 포함해야 합니다.'),
    checkPw: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('필수 입력란입니다.'),
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const watchId = watch('memberId');

  let yearArr: Array<string> = [];
  let monthArr: Array<string> = [];
  let dateArr: Array<string> = [];
  function selectBirth() {
    for (let i = new Date().getFullYear() - 18; i > 1940; i -= 1) {
      yearArr.push(String(i));
    }
    for (let i = 1; i <= 31; i += 1) {
      dateArr.push(String(i));
      if (i < 13) {
        monthArr.push(String(i));
      }
    }
    return;
  }
  selectBirth();

  const submitData = (data: SignupForm) => {
    let birth =
      data.year +
      '-' +
      (data.month.length === 1 ? data.month.padStart(2, '0') : data.month) +
      '-' +
      (data.date.length === 1 ? data.date.padStart(2, '0') : data.date) +
      'T00:00:00';
    const formData = new FormData();

    for (let i = 0; i < 11; i += 1) {
      if (
        Object.keys(data)[i] === 'year' ||
        Object.keys(data)[i] === 'month' ||
        Object.keys(data)[i] === 'date' ||
        Object.keys(data)[i] === 'checkPw'
      ) {
        null;
      } else {
        formData.append(Object.keys(data)[i], Object.values(data)[i]);
      }
    }
    formData.set('birth', birth);
    requestSignUp(formData);
  };

  return (
    <Main>
      <Div>
        <img src="/logo_fincok.png" style={{ margin: '20px auto' }} />
      </Div>
      <h1 style={{ paddingBottom: '30px' }}>Sign up</h1>
      <form onSubmit={handleSubmit((data) => submitData(data))}>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>이름</CategoryTitle>
            {errors?.name ? (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.name?.message}
              </span>
            ) : null}
          </div>
          <input id="name" type="text" placeholder="이름을 입력해 주세요." {...register('name')} />
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>아이디</CategoryTitle>
            {errors?.memberId ? (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.memberId?.message}
              </span>
            ) : null}
          </div>
          <div style={{ display: 'flex' }}>
            <input
              id="memberId"
              type="text"
              placeholder="abc@google.com"
              style={{ width: '330px', marginRight: '10px' }}
              {...register('memberId')}
            />
            <button
              style={{ fontWeight: 600 }}
              onClick={(e) => {
                e.preventDefault();
                checkIdAvailable(watchId);
              }}
            >
              중복 확인
            </button>
          </div>
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>비밀번호</CategoryTitle>
            {errors?.password && (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.password?.message}
              </span>
            )}
          </div>
          <input
            id="password"
            type="password"
            placeholder="8글자 이상 입력해 주세요"
            {...register('password')}
          />
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>비밀번호 확인</CategoryTitle>
            {errors?.checkPw && (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.checkPw?.message}
              </span>
            )}
          </div>
          <input
            id="checkPw"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            {...register('checkPw')}
          />
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>생년월일</CategoryTitle>
          </div>
          <div style={{ display: 'flex', gap: '5px', height: '40px', lineHeight: '40px' }}>
            <select id="year" required {...register('year')} style={{ width: '40%' }}>
              {yearArr.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            년
            <select
              id="month"
              required
              {...register('month')}
              style={{ width: '20%', marginLeft: '8px' }}
            >
              {monthArr.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            월
            <select
              id="date"
              required
              {...register('date')}
              style={{ width: '20%', marginLeft: '8px' }}
            >
              {dateArr.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            일
          </div>
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>직업</CategoryTitle>
          </div>
          <select id="job" required {...register('job')}>
            {jobList.map((job, index) => (
              <option key={index} value={job}>
                {job}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>지역</CategoryTitle>
          </div>
          <select id="district" required {...register('district')}>
            {addressList.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>선호 은행</CategoryTitle>
          </div>
          <select id="bank" required {...register('bank')}>
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
            {productList.map((category, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={category}
                  value={category}
                  defaultChecked={index === 0 ? true : false}
                  style={{ display: 'none' }}
                  {...register('category')}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </RadioDiv>
        </Div>
        <SubmitButton type="submit">회원가입</SubmitButton>
      </form>
    </Main>
  );
};

export const Main = styled.main`
  width: 500px;
  margin: auto;
  box-sizing: border-box;
  padding: 30px;
`;
export const Div = styled.div`
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
  display: block;
  font-size: 16px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  margin: auto;
  text-align: center;
  font-weight: 600;
  background-color: var(--color-background);
  border: 2px solid var(--color-stroke);
  border-radius: 8px;
  cursor: pointer;

  :hover {
    background-color: var(--color-orange);
    color: white;
  }
  input[type='radio']:checked + & {
    background-color: var(--color-orange);
    color: white;
  }
`;
export const CategoryTitle = styled.span`
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
  width: 100%;
  margin: 50px auto;
  font-size: 20px;
`;
export default SignUp;
