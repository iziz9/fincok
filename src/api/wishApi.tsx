import { instance, authInstance } from './axios';
import { setCookie, getCookie, removeCookie } from '../utils/cookie';
import { SetStateAction } from 'react';
import AlertModal from '../utils/AlertModal';

// 관심상품등록
export const requestSetWishList = async (
  formData: FormData,
  setLikeState: React.Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const accessToken = getCookie('accessToken');
    const res = await authInstance.post('wish', formData);
    setLikeState(true);
    if (res.data.resultCode === 'duplicate') {
      AlertModal({
        message: '이미 관심등록된 상품입니다.',
        type: 'alert',
      });
    }
    console.log(res.data);
  } catch (err) {
    alert(err);
  }
};

//관심상품 삭제
export const requestDelWishList = async (
  id: number,
  setLikeState: React.Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const accessToken = getCookie('accessToken');
    const res = await authInstance.delete(`wish/delete/${id}`);
    setLikeState(false);
    console.log('삭제 api 마지막', res.data);
  } catch (err) {
    alert(err);
  }
};

const accessToken = getCookie('accessToken');

export const getDepositWishList = async (
  page: number,
  setResult: any,
  setLastPage: any,
  setLoading: any,
) => {
  try {
    setLoading(true);
    const res = await authInstance.get(`wish_list/deposit?page=${page}`);
    const data = res.data.resultData;
    setResult((prevState: any) => [...prevState, ...data.content]);
    setLastPage(data.last);
    setLoading(false);
    console.log('상품조회 마지막', data.content);
  } catch (err) {
    alert(err);
  }
};
// 대출 관심상품 조회
export const getLoanWishList = async (
  page: number,
  setResult: any,
  setLastPage: any,
  setLoading: any,
) => {
  try {
    setLoading(true);
    const res = await authInstance.get(`wish_list/loan?page=${page}`);
    const data = res.data.resultData;
    console.log(data);
    setResult(data.content);
    setLastPage(data.last);
    setLoading(false);
  } catch (err) {
    alert(err);
  }
};

// 가입신청중인 상품 갯수 조회 (신청취소 제외)
export const getWishCount = async () => {
  return await authInstance.get('count_purchase');
};
