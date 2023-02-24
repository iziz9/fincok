import React, { useEffect } from 'react';
import styled from 'styled-components';
import user, { userInfo } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchHooks';
import { addressList, bankList, jobList, productList } from '../../utils/list';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdOutlineEditOff } from 'react-icons/md';
import { TbEdit, TbEditOff } from 'react-icons/tb';

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
      <form /* onSubmit={} */>
        <Div>
          <div>
            <RequiredOff>
              <TbEditOff />
            </RequiredOff>
            <CategoryTitle>이름</CategoryTitle>
          </div>
          <input type="text" value={userName} disabled />
        </Div>
        <Div>
          <div>
            <RequiredOff>
              <TbEditOff />
            </RequiredOff>
            <CategoryTitle>아이디(e-mail)</CategoryTitle>
          </div>
          <input type="text" value={userMemberId} disabled />
        </Div>
        <Div>
          <div>
            <RequiredOff>
              <TbEditOff />
            </RequiredOff>
            <CategoryTitle>생년월일</CategoryTitle>
          </div>
          <input type="text" value={userBirthString} disabled />
        </Div>
        <Div>
          <div>
            <Required><TbEdit /></Required>
            <CategoryTitle>직업</CategoryTitle>
          </div>
          <select id="job" value={userJob} required {...register('job')}>
            {jobList.map((job, index) => (
              <option key={index} value={job}>
                {job}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required><TbEdit /></Required>
            <CategoryTitle>지역</CategoryTitle>
          </div>
          <select id="district" value={userDistrict} required {...register('district')}>
            {addressList.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required><TbEdit /></Required>
            <CategoryTitle>선호 은행</CategoryTitle>
          </div>
          <select id="bank" value={userBank} required {...register('bank')}>
            {bankList.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </Div>
        <Div>
          <div>
            <Required><TbEdit /></Required>
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
                  checked={category === userCategory ? true : false}
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
`
const Required = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #40f75b;
  margin-right: 5px;
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
export default UserInfoEdit;
