import { instance, authInstance } from './axios';
import { setCookie, getCookie, removeCookie } from '../utils/cookie';
import { SetStateAction } from 'react';

// 관심상품등록
export const requestSetWishList = async (
  formData: FormData,
  setLikeState: React.Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const accessToken = getCookie('accessToken');
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await instance.post('wish', formData);
    setLikeState(true);
    if (res.data.resultCode === 'duplicate') {
      alert('이미 관심등록된 상품입니다.');
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
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await instance.delete(`wish/delete/${id}`);
    console.log(res.data);
    setLikeState(false);
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
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await instance.get(`wish_list/deposit?page=${page}`);
    const data = res.data.resultData
    console.log(data);
    // setResult((prevState: any) => [...prevState, ...data.content]);
    setResult(data.content);
    setLastPage(data.last);
    setLoading(false);
  } catch (err) {
    alert(err);
  }
};

export const getLoanWishList = async (page: number) => {
  try {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await instance.get(`wish_list/loan?page=${page}`);
    console.log(res.data);
  } catch (err) {
    alert(err);
  }
};