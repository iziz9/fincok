import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useDispatchHooks';

function UserProfile() {
  const name = useAppSelector((state) => state.user.name);
  const navigate = useNavigate();

  return (
    <>
      <ProfileBox>
        <FaUserCircle size="80" color="var(--color-light-grey)" />
        <MoreBox onClick={() => navigate('info')}>
          <UserText>
            <strong>{name}</strong>&nbsp;님
          </UserText>
          <div>
            내 정보 수정하기
            <MdKeyboardArrowRight />
          </div>
        </MoreBox>
      </ProfileBox>

      <RecommendWrap>
        <TextBox>
          <strong>맞춤상품 추천</strong>
          <p>나에게 맞는 상품이 궁금하다면?</p>
        </TextBox>
        <SignButton to="/recommend">
          <button>보러가기</button>
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
const MoreBox = styled.div`
  padding-left: 26px;
  cursor: pointer;
  p {
    :last-child {
      display: flex;
      gap: 2px;
    }
  }
`;
const UserText = styled.p`
  font-size: 22px;
  margin-bottom: 10px;
  strong {
    font-weight: bold;
  }
`;
const RecommendWrap = styled.div`
  border-radius: 15px;
  background-color: var(--color-bg-grey);
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
    font-size: 13px;
  }
`;
const SignButton = styled(Link)`
  width: 80px;
  height: 40px;
  button {
    width: 100%;
    height: 100%;
  }
`;

export default UserProfile;
