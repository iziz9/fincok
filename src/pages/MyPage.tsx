import React from 'react';
import CartList from '../components/common/profile/CartList';
import UserProfile from '../components/common/profile/UserProfile';
import Setting from '../components/common/profile/Setting';
import styled from 'styled-components';


const MyPage = () => {
  return (
    <div>
      <UserProfile />
      <Setting />
      <CartList />
    </div>
  )
};

export default MyPage;
