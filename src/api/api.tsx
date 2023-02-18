import axios from 'axios';
import { instance } from './axios';

export const requestLogin = async (formData: FormData) => {
  try {
    const res = await instance.post('login', formData);
    console.log(res);
    if (res.data.resultCode === 'failed') {
      throw new Error('존재하지 않는 회원정보입니다.');
    } else {
      alert('로그인 완료');
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
    }
  } catch (err) {
    alert(err);
  }
};
