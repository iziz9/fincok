import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Main, SubmitButton, Div, CategoryTitle } from './SignUp';
import { useNavigate } from 'react-router-dom';
import { IoMailOutline } from 'react-icons/io5';
import { SlLock } from 'react-icons/sl';
import { requestLogin } from '../../api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getCookie } from '../../utils/cookie';
import AlertLoginState from '../../components/common/AlertLoginState';
import { useAppDispatch } from '../../hooks/useDispatchHooks';
import { userLogin } from '../../store/loginSlice';
import { setCookie } from '../../utils/cookie';

interface LoginForm {
  id: string;
  pw: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        const accessToken = res.accessToken;
        setCookie('accessToken', accessToken);
        alert('로그인 완료');
        dispatch(userLogin(formData));
        location.pathname = '/';
      }
    } catch (err) {
      alert(err);
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
              style={{ margin: '25px auto', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </Div>
          <h1 style={{ padding: '30px 0 50px' }}>Login</h1>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data.id, data.pw);
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
                  placeholder="abc@google.com"
                  style={{ width: '380px', paddingLeft: '45px' }}
                  {...register('id')}
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
            <SubmitButton type="submit">로그인</SubmitButton>
          </form>
          <Flexdiv>
            <NavSpan onClick={() => navigate('/findpassword')}>비밀번호 찾기</NavSpan> /{' '}
            <NavSpan onClick={() => navigate('/signup')}>회원가입</NavSpan>
          </Flexdiv>
        </>
      )}
    </Main>
  );
};

const Flexdiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
export const NavSpan = styled.span`
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

export default Login;
