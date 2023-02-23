import { instance, authInstance } from './axios';
import { SetStateAction } from 'react';

//로그인
export const requestLogin = async (formData: FormData) => {
  const res = await instance.post('login', formData);
  // authInstance.interceptors.response.use(() => {

  // });
  return res.data;
};

// 로그아웃
export const requestLogout = async () => {
  const res = await authInstance.post('/logout');
  return res.data;
};

// 회원가입
export const requestSignUp = async (formData: FormData) => {
  const isExistId = await instance.post(`duplication/${formData.get('memberId')}`);
  const res = await instance.post('signup', formData);
  return { isExistId, res };
};

// 이메일 중복검사
export const checkIdAvailable = async (id: string) => {
  return await instance.post(`duplication/${id}`);
};

// 비밀번호 재설정 메일 전송
export const requestFindPw = async (id: string, name: string) => {
  return await instance.get(`find_password?memberId=${id}&name=${name}`);
};

// 메인-맞춤 상품 조회
export const getProducts = async () => {
  const res = await authInstance.get('main_recommend');
  return res.data.resultData;
};

// 맞춤 상품 조회
export const getRecommendProducts = async (page: number) => {
  const send = {
    page: page,
  };
  const res = await authInstance.get(`custom_recommend`, { params: { ...send } });
  return res.data.resultData;
};

// 상품 상세조회
export const getProductDetail = async (category: string, itemId: string, setIsNotFound: any) => {
  const res = await authInstance.get(`search/${category}/detail/${itemId}`);
  return res.data;
};

// 유저 정보 출력
export const requestUserInfo = async () => {
  const res = await authInstance.post('member/info');
  return res.data.resultData;
};

// 검색-예금 적금
export const getDeposit = async (title: string, page: number) => {
  const send = {
    content: title,
    page: page,
  };
  const res = await authInstance.get(`search_deposit`, { params: { ...send } });
  return res.data;
};

// 검색-대출
export const getLoan = async (title: string, page: number) => {
  const send = {
    content: title,
    page: page,
  };
  const res = await authInstance.get(`search_loan`, { params: { ...send } });
  return res.data;
};

// 상품 신청
export const requestPurchase = async (formData: FormData) => {
  return authInstance.post('purchase', formData);
};

export const getDepositPurchase = async (setResult: SetStateAction<any>) => {
  const res = await authInstance.get(`deposit/purchase_list?page=1`);
  const data = res.data.resultData;
  console.log(data);
  setResult([...data.content]);
};

export const getLoanPurchase = async (setResult: SetStateAction<any>, setLoading: any) => {
  const res = await authInstance.get(`loan/purchase_list?page=1`);
  const data = res.data.resultData;
  console.log(data);
  setResult([...data.content]);
  setLoading(true);
};

// 회원정보 수정
export const editUserInfo = async (formData: FormData) => {
  return await authInstance.patch('member/update');
};
