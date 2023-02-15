import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';

function UserProfile() {
  return (
    <>
      <div>
        <div>
          <FaUserCircle size="100" color="var(--color-light-grey)" />
        </div>
        <div>
          <p>
            <strong>유저명</strong>님
          </p>
          <p>
            내 정보 확인하기
            <MdKeyboardArrowRight />
          </p>
        </div>
      </div>
      <RecommendWrap>
        <div>
          <strong>맞춤상품 추천</strong>
          <p>나에게 맞는 상품 추천</p>
        </div>
        <button>가입</button>
      </RecommendWrap>
    </>
  );
}
const RecommendWrap = styled.div`
  background-color: var(background-color);
`

export default UserProfile;
