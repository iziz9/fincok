import React from 'react';
import {
  HiOutlineHome,
  HiHome,
  HiHeart,
  HiOutlineHeart,
  HiClipboardList,
  HiOutlineClipboardList,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function CategoryBar() {
  const location = useLocation();
  console.log(location);
  return (
    <CategoryWrap>
      <li>
        <LinkStyle to="/">
          {location.pathname === '/' ? (
            <HiHome color="red" />
          ) : (
            <HiOutlineHome />
          )}
          <p>홈</p>
        </LinkStyle>
      </li>
      <li>
        <LinkStyle to="/recommend">
          {location.pathname === '/recommend' ? (
            <HiHeart />
          ) : (
            <HiOutlineHeart />
          )}
          <p>맞춤 추천</p>
        </LinkStyle>
      </li>
      <li>
        <LinkStyle to="/allproducts">
          {location.pathname === '/allproducts' ? (
            <HiClipboardList />
          ) : (
            <HiOutlineClipboardList />
          )}
        <p>전체 상품</p>
        </LinkStyle>
      </li>
    </CategoryWrap>
  );
}
const CategoryWrap = styled.ul`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  svg {
    font-size: 24px;
    color: black;
  }
`;
  const LinkStyle = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items : center;
    width: 100px;
  `
export default CategoryBar;
