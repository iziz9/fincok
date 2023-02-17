import axios from 'axios';
import { instance } from './axios';

export const requestLogin = async (id: string, pw: string) => {
  try {
    const res = await instance.post('login', {
      id,
      pw,
    });
    console.log(res);
    if (res.data.resultCode === 'failed') {
      throw new Error('존재하지 않는 회원정보입니다.');
    }
  } catch (err) {
    alert(err);
  }
};

// 맞춤 상품 조회
export const getProducts = async () => {
  return instance.get(`api`);
};
