import React from 'react';
import { Link } from 'react-router-dom';
import { requestLogout } from '../../api/api';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdKeyboardArrowRight, MdErrorOutline } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAppDispatch } from '../../hooks/useDispatchHooks';
import { userInit } from '../../store/userSlice';
import styled from 'styled-components';

function Setting() {
  const dispatch = useAppDispatch();

  return (
    <SettingWrap>
      <h3>설정</h3>
      <LinkBox to="/cart">
        <FelxBox>
          <AiOutlineShoppingCart size="22" />
          <p>장바구니 상품</p>
        </FelxBox>
        <MdKeyboardArrowRight size="22" />
      </LinkBox>
      <LinkBox to="/wish">
        <FelxBox>
          <HiOutlineHeart size="22" />
          <p>관심 상품</p>
        </FelxBox>
        <MdKeyboardArrowRight size="22" />
      </LinkBox>
      <Logout
        onClick={() => {
          requestLogout();
          dispatch(userInit());
        }}
      >
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
    margin-bottom: 20px;
  }
`;
const LinkBox = styled(Link)`
  ${buttonStyle}
  padding: 15px 0;
  font-weight: 500;
`;
const Logout = styled.button`
  ${buttonStyle}
  width : 100%;
  font-size: 15px;
  background-color: #fff;
  color: var(--color-black);
  border: transparent;
  padding: 0;
  font-weight: 500;
  :hover {
    background-color: #fff;
  }
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
