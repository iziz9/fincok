import axios from 'axios';
import { instance } from './axios';
import { setCookie, getCookie, removeCookie } from '../utils/cookie';

//로그인
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
      location.pathname = '/';
      console.log(getCookie('accessToken'));
    }
  } catch (err) {
    alert(err);
  }
};

// 로그아웃
export const requestLogout = async () => {
  try {
    const accessToken = getCookie('accessToken');
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await instance.post('/logout');
    console.log(res);
    if (res.data.resultCode === 'failed') {
      throw new Error('로그아웃 에러');
    } else {
      removeCookie();
      alert('로그아웃 되었습니다.');
      // location.pathname = '/';
    }
  } catch (err) {
    alert('로그아웃에 실패했습니다.');
  }
};

// 맞춤 상품 조회
export const getProducts = async () => {
  return instance.get(`api`);
};

// 회원가입
export const requestSignUp = async (formData: FormData) => {
  try {
    const isExistId = await instance.post(`api/duplication/${formData.get('memberId')}`);
    const res = await instance.post('signup', formData);
    if (isExistId.data) {
      alert('이미 존재하는 아이디로는 가입할 수 없습니다. 비밀번호 찾기를 이용해주세요.');
    } else if (res.data.resultCode === 'failed') {
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
    if (res.data === true) {
      alert('이미 존재하는 아이디입니다. 비밀번호 찾기를 이용해주세요.');
    } else {
      alert('사용 가능한 아이디입니다.');
    }
  } catch (err) {
    alert(err);
  }
};

// 비밀번호 재설정 메일 전송
export const requestFindPw = async (id: string, name: string, setLoading: any) => {
  try {
    const isCorrectUser = await instance.get(`findPw?memberId=${id}&name=${name}`);
    if (isCorrectUser.data.resultCode === 'failed') {
      alert('일치하는 회원정보가 없습니다. 다시 확인해주세요.');
    } else {
      //로딩애니메이션 시작
      setLoading(true);
      const res = await instance.post(`findPw/sendMail?memberId=${id}&name=${name}`);
      setLoading(false);
      res.data.resultCode === 'success'
        ? alert('비밀번호 재설정 메일이 전송되었습니다. 메일함을 확인해주세요.')
        : alert('에러가 발생했습니다. 다시 시도해주세요.');
    }
  } catch (err) {
    alert(err);
  } finally {
    //로딩애니메이션 중지
  }
};

// 상품 상세조회
export const getProductDetail = async (category: string, itemId: string) => {
  try {
    // const res = await instance.get(`search/${category}/detail/${itemId}`);
    const res = await instance.get(`search${category}Detail/${itemId}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    alert(err);
  }
};
getProductDetail('Deposit', '20');
