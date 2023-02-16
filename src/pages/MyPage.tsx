import React from 'react';
import CartList from '../components/common/profile/CartList';
import UserProfile from '../components/common/profile/UserProfile';
import Setting from '../components/common/profile/Setting';
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
  padding: 24px;
`;

export default MyPage;
