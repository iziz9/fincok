import React from 'react';
import Purchase from './Purchase';
import UserProfile from '../components/user/UserProfile';
import MyMenu from '../components/user/MyMenu';
import styled from 'styled-components';
import { getCookie } from '../utils/cookie';
import AlertLoginState from '../components/common/AlertLoginState';

const MyPage = () => {
  return (
    <PageWrap>
      {getCookie('accessToken') ? (
        <>
          <UserProfile />
          <MyMenu />
        </>
      ) : (
        <AlertLoginState text={'로그인 후 이용 가능합니다.'} />
      )}
    </PageWrap>
  );
};
const PageWrap = styled.div`
  padding: 35px;
`;

export default MyPage;
