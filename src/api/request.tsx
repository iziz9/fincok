import axios from 'axios';

// const baseURL = ''

// 로그인 테스트
export const requestLogin = async (id: string, pw: string) => {
  try {
    const url =
      'https://abf630fa-517f-4e51-9dac-36cba71c3ecc.mock.pstmn.io/api/login';
    const res = await axios.post(url, {
      id,
      pw,
    });
    console.log(res);
  } catch (err) {
    console.log('에러발생 : ', err);
  }
};
