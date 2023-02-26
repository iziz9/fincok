import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/useDispatchHooks';
import { addressList, bankList, jobList, productList } from '../../utils/list';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TbEdit, TbEditOff } from 'react-icons/tb';
import AlertModal from '../../utils/AlertModal';
import { editUserInfo } from '../../api/api';

function EditUser({ userPassword }: any) {
  const formSchema = yup.object({
    password: yup
      .string()
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
    formState: { errors },
  } = useForm<SignupForm>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const [userName, userMemberId, birth, userCategory, userBank, userDistrict, userJob] =
    useAppSelector((state) => {
      const user = state.user;
      return [
        user.name,
        user.memberId,
        user.birth,
        user.category,
        user.bank,
        user.district,
        user.job,
      ];
    });
  let userBirth = new Date(birth);
  const date = new Date();
  const userYear = userBirth.getFullYear();
  const userMonth = userBirth.getMonth() + 1;
  const userDate = userBirth.getDate();

  useEffect(() => {
    console.log(
      userName,
      userMemberId,
      userYear,
      userMonth + 1,
      userDate,
      userCategory,
      userBank,
      userDistrict,
      userJob,
    );
  }, []);

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
    return formData;
  };

  const onSignup = async (data: any) => {
    const formData = submitData(data);
    try {
      const res = await editUserInfo(formData);
      if (res.data.resultCode === 'failed') {
        AlertModal({
          message: '에러가 발생했습니다1. 다시 시도해주세요.',
          type: 'alert',
        });
      } else {
        AlertModal({
          message: '회원정보 수정이 완료되었습니다.',
          type: 'alert',
          action: () => {
            location.pathname = '/user';
          },
        });
      }
    } catch (err) {
      AlertModal({
        message: '에러가 발생했습니다2. 다시 시도해주세요.',
        type: 'alert',
      });
    }
  };

  return (
    <Wrap>
      <Title>회원정보 수정</Title>
      <form
        onSubmit={handleSubmit((data) => {
          onSignup(data);
          console.log(data);
        })}
      >
        <Div>
          <div>
            <RequiredOff>
              <TbEditOff />
            </RequiredOff>
            <CategoryTitle>이름</CategoryTitle>
          </div>
          <input
            id="name"
            type="text"
            defaultValue={userName}
            {...register('name')}
            readOnly
            style={{
              cursor: 'default',
            }}
          />
        </Div>
        <Div>
          <div>
            <RequiredOff>
              <TbEditOff />
            </RequiredOff>
            <CategoryTitle>아이디(e-mail)</CategoryTitle>
          </div>
          <input
            type="text"
            defaultValue={userMemberId}
            disabled
            style={{
              cursor: 'default',
            }}
          />
        </Div>
        <Div>
          <div>
            <RequiredOff>
              <TbEditOff />
            </RequiredOff>
            <CategoryTitle>생년월일</CategoryTitle>
          </div>
          <BirthBox>
            <input
              id="year"
              type="text"
              defaultValue={userYear}
              {...register('year')}
              readOnly
              style={{
                cursor: 'default',
              }}
            />
            <p>년</p>
            <input
              id="month"
              type="text"
              defaultValue={userMonth}
              {...register('month')}
              readOnly
              style={{
                cursor: 'default',
              }}
            />
            <p>월</p>
            <input
              id="date"
              type="text"
              defaultValue={userDate}
              {...register('date')}
              readOnly
              style={{
                cursor: 'default',
              }}
            />
            <p>일</p>
          </BirthBox>
        </Div>
        <Div>
          <div>
            <Require>
              <TbEdit />
            </Require>
            {errors?.password && (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.checkPw?.message}
              </span>
            )}
            <CategoryTitle>비밀번호 변경</CategoryTitle>
          </div>
          <input
            type="password"
            id="password"
            defaultValue={userPassword}
            {...register('password')}
          />
        </Div>
        <Div>
          <div>
            <Require>
              <TbEdit />
            </Require>
            <CategoryTitle>비밀번호 체크</CategoryTitle>
            {errors?.checkPw && (
              <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                {errors.checkPw?.message}
              </span>
            )}
          </div>
          <input
            type="password"
            id="checkPw"
            defaultValue={userPassword}
            {...register('checkPw')}
          />
        </Div>
        <Div>
          <div>
            <Required>
              <TbEdit />
            </Required>
            <CategoryTitle>직업</CategoryTitle>
          </div>
          <select id="job" defaultValue={userJob} {...register('job')}>
            {jobList.map((job, index) => (
              <option key={index} value={job}>
                {job}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required>
              <TbEdit />
            </Required>
            <CategoryTitle>지역</CategoryTitle>
          </div>
          <select id="district" defaultValue={userDistrict} required {...register('district')}>
            {addressList.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required>
              <TbEdit />
            </Required>
            <CategoryTitle>선호 은행</CategoryTitle>
          </div>
          <select id="bank" defaultValue={userBank} required {...register('bank')}>
            {bankList.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required>
              <TbEdit />
            </Required>
            <CategoryTitle>관심있는 상품</CategoryTitle>
          </div>
          <RadioDiv>
            {productList.map((category, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={category}
                  value={category}
                  style={{ display: 'none' }}
                  {...register('category')}
                  defaultChecked={category === userCategory ? true : false}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </RadioDiv>
        </Div>
        <SubmitButton type="submit">회원정보 수정</SubmitButton>
      </form>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 30px;
  cursor: default;
`;
const Title = styled.h2`
  margin-top: 40px;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: bold;
`;
export const Div = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const RequiredOff = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #f74440;
  margin-right: 5px;
`;
const Required = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #40f75b;
  margin-right: 5px;
`;
const Require = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-right: 5px;
  color: #f7e240;
`;
const BirthBox = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  input {
    width: 10%;
    :nth-child(1) {
      width: 20%;
    }
  }
  p {
    margin-right: 15px;
    margin-left: 5px;
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
export const SubmitButton = styled.button`
  width: 100%;
  margin: 50px auto;
  font-size: 20px;
`;
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
export default EditUser;
