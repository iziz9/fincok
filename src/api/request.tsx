import axios from 'axios';

// const baseURL = 'http://13.125.118.210:8080'

// 로그인 테스트
export const requestLogin = async (id: string, pw: string) => {
  try {
    const url = 'http://13.125.118.210:8080/login';
    const res = await axios.post(url, {
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
