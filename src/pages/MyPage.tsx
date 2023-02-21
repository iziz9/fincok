import React from 'react';
import CartList from '../components/user/CartList';
import UserProfile from '../components/user/UserProfile';
import Setting from '../components/user/Setting';
import styled from 'styled-components';


const MyPage = () => {
  return (
    <PageWrap>
      <UserProfile />
      <Setting />
      <CartList />
    </PageWrap>
  )
};
const PageWrap = styled.div`
  padding: 35px;
`;

export default MyPage;
