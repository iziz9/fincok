import React from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdKeyboardArrowRight, MdErrorOutline } from 'react-icons/md';
import styled from 'styled-components';

function Setting() {
  return (
    <SettingWrap>
      <h2>설정</h2>
      <div>
        <HiOutlineHeart />
        <p>관심 상품</p>
        <MdKeyboardArrowRight />
      </div>
      <div>
        <MdErrorOutline />
        <p>로그아웃</p>
        <MdKeyboardArrowRight />
      </div>
    </SettingWrap>
  );
}
const SettingWrap = styled.div`
  display: flex;
  
`

export default Setting;
