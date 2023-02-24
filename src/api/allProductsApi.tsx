import AlertModal from '../utils/AlertModal';
import { instance } from './axios';

// 전체 적금 상품 조회
export const getSavingsList = async (
  page = 1,
  setResult: any,
  setLastPage: any,
  setLoading: any,
) => {
  try {
    setLoading(true);
    const res = await instance.get(`savings_list?page=${page}`);
    const data = res.data;
    setResult((prevState: any) => [...prevState, ...data.content]);
    setLastPage(data.last);
    setLoading(false);
  } catch (err) {
    AlertModal({
      message: '에러가 발생했습니다. 다시 시도해주세요.',
      type: 'alert',
    });
  }
};

// 전체 예금 상품 조회
export const getDepositList = async (
  page = 1,
  setResult: any,
  setLastPage: any,
  setLoading: any,
) => {
  try {
    setLoading(true);
    const res = await instance.get(`deposit_list?page=${page}`);
    const data = res.data;
    setResult((prevState: any) => [...prevState, ...data.content]);
    setLastPage(data.last);
    setLoading(false);
  } catch (err) {
    AlertModal({
      message: '에러가 발생했습니다. 다시 시도해주세요.',
      type: 'alert',
    });
  }
};

// 전체 주택담보대출 조회
export const getMortgageLoan = async (
  page = 1,
  setResult: any,
  setLastPage: any,
  setLoading: any,
) => {
  try {
    setLoading(true);
    const res = await instance.get(`mortgage_loan?page=${page}`);
    const data = res.data;
    setResult((prevState: any) => [...prevState, ...data.content]);
    setLastPage(data.last);
    setLoading(false);
  } catch (err) {
    AlertModal({
      message: '에러가 발생했습니다. 다시 시도해주세요.',
      type: 'alert',
    });
  }
};

// 전체 전세자금대출 조회
export const getCharterLoan = async (
  page = 1,
  setResult: any,
  setLastPage: any,
  setLoading: any,
) => {
  try {
    setLoading(true);
    const res = await instance.get(`charter_loan?page=${page}`);
    const data = res.data;
    setResult((prevState: any) => [...prevState, ...data.content]);
    setLastPage(data.last);
    setLoading(false);
  } catch (err) {
    AlertModal({
      message: '에러가 발생했습니다. 다시 시도해주세요.',
      type: 'alert',
    });
  }
};
