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

// 회원가입
export const requestSignUp = async (
  memberid: string,
  password: string,
  name: string,
  birth: string,
  job: string,
  district: string,
  bank: string,
  category: String,
) => {
  try {
    const res = await instance.post('signup', {
      memberid,
      password,
      name,
      birth,
      job,
      district,
      bank,
      category,
    });
    console.log(res);
    if (res.data.resultCode === 'failed') {
      throw new Error('존재하지 않는 회원정보입니다.');
    }
  } catch (err) {
    alert(err);
  }
};
