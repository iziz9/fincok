import axios from 'axios';
import { instance } from './axios';
import { setCookie, getCookie } from '../utils/cookie';

export const requestLogin = async (formData: FormData) => {
  try {
    const res = await instance.post('login', formData);
    console.log(res);
    if (res.data.resultCode === 'failed') {
      throw new Error('존재하지 않는 회원정보입니다.');
    } else {
      const accessToken = res.data.accessToken;
      setCookie('accessToken', accessToken);
      alert('로그인 완료');
      console.log(getCookie('accessToken'));
      location.pathname = '/';
    }
  } catch (err) {
    alert(err);
  }
};

// 맞춤 상품 조회
export const getProducts = async () => {
  return instance.get(`api`);
};

// 회원가입
export const requestSignUp = async (formData: FormData) => {
  try {
    const res = await instance.post('signup', formData);
    console.log(res);
    if (res.data.resultCode === 'failed') {
      throw new Error('정상적인 가입 요청이 아닙니다.');
    } else {
      alert('회원가입이 완료되었습니다!');
      location.pathname = '/login';
    }
  } catch (err) {
    alert(err);
  }
};

// 이메일 중복검사
export const checkIdAvailable = async (id: string) => {
  try {
    const res = await instance.post(`api/duplication/${id}`);
    console.log(res);
    if (res.data === true) {
      alert('이미 존재하는 아이디입니다. 비밀번호 찾기를 이용해주세요.');
      // true일때 해당 아이디로 등록 못 하게?
    } else {
      alert('사용 가능한 아이디입니다.');
    }
  } catch (err) {
    alert(err);
  }
};
