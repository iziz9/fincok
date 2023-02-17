import React from 'react';
import CartList from '../components/common/user/CartList';
import UserProfile from '../components/common/user/UserProfile';
import Setting from '../components/common/user/Setting';
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
