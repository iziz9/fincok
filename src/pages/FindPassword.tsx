import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Main, SubmitButton, Div, CategoryTitle } from './SignUp';
import { useNavigate } from 'react-router-dom';
import { IoMailOutline } from 'react-icons/io5';
import { requestFindPw } from '../api/api';
import { BeatLoader } from 'react-spinners';
import { getCookie } from '../utils/cookie';
import AlertLoginState from '../components/common/AlertLoginState';
import { instance } from '../api/axios';
import AlertModal from '../utils/AlertModal';

type findForm = {
  memberId: string;
  name: string;
};

const FindPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formSchema = yup.object({
    name: yup
      .string()
      .required('필수 입력란입니다.')
      .matches(/^[가-힣]+$/, '이름을 정확히 입력해주세요.')
      .min(2, '이름을 정확히 입력해주세요.'),
    memberId: yup.string().required('필수 입력란입니다.').email('이메일 형식에 맞지 않습니다.'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<findForm>({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (memberId: string, name: string) => {
    const isCorrectUser = await requestFindPw(memberId, name);
    try {
      if (isCorrectUser.data.resultCode === 'failed') {
        AlertModal({
          message: '일치하는 회원정보가 없습니다. 다시 확인해주세요.',
          type: 'alert',
        });
      } else {
        //로딩애니메이션 시작
        setLoading(true);
        const res = await instance.post(
          `find_password/send_mail?memberId=${memberId}&name=${name}`,
        );
        setLoading(false);
        res.data.resultCode === 'success'
          ? AlertModal({
              message: '비밀번호 재설정 메일이 전송되었습니다. 메일함을 확인해주세요.',
              type: 'alert',
            })
          : AlertModal({
              message: '에러가 발생했습니다. 다시 시도해주세요.',
              type: 'alert',
            });
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
        <AlertLoginState text={'이미 로그인 상태입니다.'} />
      ) : (
        <>
          <Div>
            <img
              src="/logo_fincok.png"
              style={{ margin: '20px auto', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </Div>
          <Flexdiv>
            <h1 style={{ margin: '0 0 30px', color: '#f74440', fontSize: '30px' }}>
              비밀번호 찾기
            </h1>
          </Flexdiv>
          <FlexText>
            핀콕에 가입했던 회원정보를 입력해주세요. <br />
            비밀번호 재설정 메일을 보내드립니다.
          </FlexText>
          <form onSubmit={handleSubmit((data) => onSubmit(data.memberId, data.name))}>
            <Div>
              <div>
                <CategoryTitle>이름</CategoryTitle>
                {errors?.name ? (
                  <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                    {errors.name?.message}
                  </span>
                ) : null}
              </div>
              <div style={{ position: 'relative', marginBottom: '30px' }}>
                <IoMailOutline style={{ position: 'absolute', top: '20px', left: '20px' }} />
                <input
                  id="name"
                  type="text"
                  placeholder="김핀콕"
                  style={{ width: '380px', paddingLeft: '45px' }}
                  {...register('name')}
                />
              </div>
              <div>
                <CategoryTitle>아이디</CategoryTitle>
                {errors?.memberId ? (
                  <span className="error" style={{ marginLeft: '10px', color: '#f74440' }}>
                    {errors.memberId?.message}
                  </span>
                ) : null}
              </div>
              <div style={{ position: 'relative', marginBottom: '30px' }}>
                <IoMailOutline style={{ position: 'absolute', top: '20px', left: '20px' }} />
                <input
                  id="memberId"
                  type="text"
                  placeholder="abc@google.com"
                  style={{ width: '380px', paddingLeft: '45px' }}
                  {...register('memberId')}
                />
              </div>
            </Div>
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BeatLoader size="20px" margin="2px" />
              </div>
            )}
            <SubmitButton type="submit">비밀번호 재설정하기</SubmitButton>
          </form>
        </>
      )}
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
