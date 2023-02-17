import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { productList, jobList, bankList, addressList } from '../../utils/list';

interface SignupForm {
  name: string;
  id: string;
  pw: string;
  job: string;
  address: string;
  bank: string;
  product: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();
  const [result, setResult] = useState('');

  return (
    <Main>
      <Div>
        <img src="/logo_fincok.png" style={{ margin: '20px auto' }} />
      </Div>
      <h1 style={{ paddingBottom: '30px' }}>Sign up</h1>
      <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>이름</CategoryTitle>
            {errors?.name ? (
              <span
                className="error"
                style={{ marginLeft: '10px', color: '#f74440' }}
              >
                {errors.name?.message}
              </span>
            ) : null}
          </div>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력해 주세요."
            {...register('name', {
              minLength: {
                value: 2,
                message: '2글자 이상 입력해주세요.',
              },
              required: '필수 입력란입니다.',
            })}
          />
        </Div>
        <Div>
          <div>
            <Required>*</Required>
            <CategoryTitle>아이디</CategoryTitle>
            {errors?.id ? (
              <span
                className="error"
                style={{ marginLeft: '10px', color: '#f74440' }}
              >
                {errors.id?.message}
              </span>
            ) : null}
          </div>
          <div style={{ display: 'flex' }}>
            <input
              id="id"
              type="text"
              placeholder="abc@google.com"
              style={{ width: '330px', marginRight: '10px' }}
              {...register('id', {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
                required: '필수 입력란입니다.',
              })}
            />
            <button
              style={{ fontWeight: 600 }}
              onClick={(e) => {
                e.preventDefault();
                console.log('중복확인 API 연결');
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
            {errors?.pw ? (
              <span
                className="error"
                style={{ marginLeft: '10px', color: '#f74440' }}
              >
                {errors.pw?.message}
              </span>
            ) : null}
          </div>
          <input
            id="pw"
            type="password"
            placeholder="8글자 이상 입력해 주세요"
            {...register('pw', {
              minLength: {
                value: 8,
                message: '8글자 이상 입력해주세요.',
              },
              required: '필수 입력란입니다.',
            })}
          />
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
          <select id="address" required {...register('address')}>
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
            {productList.map((product, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={product}
                  value={product}
                  defaultChecked={index === 0 ? true : false}
                  style={{ display: 'none' }}
                  {...register('product')}
                />
                <Label htmlFor={product}>{product}</Label>
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
