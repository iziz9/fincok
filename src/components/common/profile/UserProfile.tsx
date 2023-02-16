import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function UserProfile() {
  return (
    <>
      <ProfileBox>
        <FaUserCircle size="80" color="var(--color-light-grey)" />
        <MoreBox to="/">
          <UserText>
            <strong>유저명</strong>&nbsp;님
          </UserText>
          <p>
            내 정보 확인하기
            <MdKeyboardArrowRight />
          </p>
        </MoreBox>
      </ProfileBox>

      <RecommendWrap>
        <TextBox>
          <strong>맞춤상품 추천</strong>
          <p>나에게 맞는 상품 추천</p>
        </TextBox>
        <SignButton to="/auth/signup">
          <button>가입</button>
        </SignButton>
      </RecommendWrap>
    </>
  );
}
const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const MoreBox = styled(Link)`
  padding-left: 26px;
`;
const UserText = styled.p`
  font-size: 22px;
  margin-bottom: 8px;
  strong {
    font-weight: bold;
  }
`;
const RecommendWrap = styled.div`
  border-radius: 15px;
  background-color: var(--color-background);
  display: flex;
  justify-content: space-between;
  padding: 0 22px;
  align-items: center;
  height: 85px;
`;
const TextBox = styled.div`
  strong {
    display: block;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  p {
    color: rgba(0, 0, 0, 0.5);
  }
`;
const SignButton = styled(Link)`
  width: 57px;
  height: 38px;
  button {
    width: 100%;
    height: 100%;
  }
`;

export default UserProfile;
