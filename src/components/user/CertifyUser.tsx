import React from 'react';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import { Main, SubmitButton, Div, CategoryTitle } from '../../pages/Auth/SignUp';
import AlertLoginState from '../common/AlertLoginState';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchHooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import AlertModal from '../../utils/AlertModal';
import { userLogin } from '../../store/loginSlice';
import { requestLogin } from '../../api/api';
import { IoMailOutline } from 'react-icons/io5';
import { SlLock } from 'react-icons/sl';

function CertifyUser({ setCertify, setPassword }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userMemberId = useAppSelector((state) => {
    return state.user.memberId;
  });
  const formSchema = yup.object({
    id: yup.string().required('필수 입력란입니다.').email('이메일 형식에 맞지 않습니다.'),
    pw: yup
      .string()
      .required('필수 입력란입니다.')
      .min(8, '영문, 숫자 포함 8자 이상 입력해주세요.')
      .max(15, '최대 15자까지 입력 가능합니다.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/, '영문, 숫자를 모두 포함해야 합니다.'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (id: string, pw: string) => {
    const formData = new FormData();
    formData.append('memberId', id);
    formData.append('password', pw);
    try {
      const res = await requestLogin(formData);
      if (res.resultCode === 'failed') {
        AlertModal({
          message: '아이디 또는 비밀번호가 일치하지 않습니다.',
          type: 'alert',
        });
      } else {
        dispatch(userLogin(formData));
        setCertify(true);
      }
    } catch (err) {
      AlertModal({
        message: '에러가 발생했습니다. 다시 시도해주세요.',
        type: 'alert',
      });
    }
  };
  return (
    <Main>
      {getCookie('accessToken') ? (
        <>
          <h1 style={{ padding: '30px 0 50px' }}>회원 인증</h1>
          <div style={{ textAlign: 'end', color: 'var(--color-orange)' }}>
            회원정보 수정을 위해 다시 로그인 해 주세요.
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data.id, data.pw);
              setPassword(data.pw);
            })}
          >
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
                  defaultValue={userMemberId}
                  style={{ width: '380px', paddingLeft: '45px', cursor: 'default' }}
                  {...register('id')}
                  readOnly
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
                  {...register('pw')}
                />
              </div>
            </Div>
            <SubmitButton type="submit">확인</SubmitButton>
          </form>
        </>
      ) : null}
    </Main>
  );
}

export const NavSpan = styled.span`
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

interface LoginForm {
  id: string;
  pw: string;
}
export default CertifyUser;
