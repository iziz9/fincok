import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string) => {
  const halfHour = new Date(Number(new Date()) + 60 * 30 * 1000);
  return cookies.set(name, value, {
    expires: halfHour, //30분 후 쿠키삭제(set으로 연장기능 추가?)
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = () => {
  return cookies.remove('accessToken');
};
