import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdKeyboardArrowRight, MdErrorOutline } from 'react-icons/md';
import styled from 'styled-components';

function Setting() {
  return (
    <SettingWrap>
      <h3>설정</h3>
      <LinkBox to="/cart">
        <FelxBox>
          <HiOutlineHeart size="22" />
          <p>관심 상품</p>
        </FelxBox>
        <MdKeyboardArrowRight size="22" />
      </LinkBox>
      <Logout>
        <FelxBox>
          <MdErrorOutline size="22" color="var(--color-orange)" />
          <p style={{ color: 'var(--color-orange)' }}>로그아웃</p>
        </FelxBox>
        <MdKeyboardArrowRight size="22" color="var(--color-orange)" />
      </Logout>
    </SettingWrap>
  );
}
const buttonStyle = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover{
    font-weight: bold;
  } 
`;
const SettingWrap = styled.div`
  margin-top: 50px;
  h3 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 40px;
  }
`;
const LinkBox = styled(Link)`
  ${buttonStyle}
  margin-bottom: 15px;
`;
const Logout = styled.button`
  ${buttonStyle}
`;
const FelxBox = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 18px;
    padding-left: 10px;
  }
`;
export default Setting;
