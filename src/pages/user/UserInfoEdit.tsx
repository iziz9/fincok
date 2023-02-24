import React, { useEffect } from 'react';
import styled from 'styled-components';
import user, { userInfo } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchHooks';
import { addressList, bankList, jobList, productList } from '../../utils/list';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UserInfoEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors }, // 버전 6라면 errors라고 작성함.
  } = useForm({
    // resolver: yupResolver(),
  });

  const [userName, userMemberId, userBirth, userCategory, userBank, userDistrict, userJob] =
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
  let userDate = new Date(userBirth);
  const userBirthString = `${userDate.getFullYear()}. ${userDate.getDate()}. ${userDate.getMonth()}`;

  useEffect(() => {
    console.log(
      userName,
      userMemberId,
      userBirthString,
      userCategory,
      userBank,
      userDistrict,
      userJob,
    );
  }, []);

  return (
    <Wrap>
      <form action="">
        <input type="text" value={userName} disabled />
        <input type="text" value={userMemberId} disabled />
        <input type="text" value={userBirthString} disabled />
      </form>
      <Div>
        <div>
          <Required>*</Required>
          <CategoryTitle>직업</CategoryTitle>
        </div>
        <select id="job" required {...register('job')}>
          {jobList.map((job, index) => (
            <option key={index} value={job} selected={job === userJob ? true : false}>
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
            <option
              key={index}
              value={district}
              selected={district === userDistrict ? true : false}
            >
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
            <option key={index} value={bank} selected={bank === userBank ? true : false}>
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
                checked={category === userCategory ? true : false}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </RadioDiv>
      </Div>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 30px;
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
export default UserInfoEdit;
