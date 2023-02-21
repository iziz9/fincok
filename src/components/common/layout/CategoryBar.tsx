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
  const location = useLocation().pathname;
  const blackColor = 'var(--color-black)';
  const orangeColor = 'var(--color-orange)';
  return (
    <CategoryWrap>
      <li>
        <LinkStyle to="/">
          {location === '/' ? (
            <>
              <HiHome color={orangeColor} />
              <CategoryName color={orangeColor}>홈</CategoryName>
            </>
          ) : (
            <>
              <HiOutlineHome color={blackColor} />
              <CategoryName color={blackColor}>홈</CategoryName>
            </>
          )}
        </LinkStyle>
      </li>
      <li>
        <LinkStyle to="/recommend">
          {location === '/recommend' ? (
            <>
              <HiHeart color={orangeColor} />
              <CategoryName color={orangeColor}>맞춤추천</CategoryName>
            </>
          ) : (
            <>
              <HiOutlineHeart color={blackColor} />
              <CategoryName color={blackColor}>맞춤추천</CategoryName>
            </>
          )}
        </LinkStyle>
      </li>
      <li>
        <LinkStyle to="/allproducts">
          {location === '/allproducts' ? (
            <>
              <HiClipboardList color={orangeColor} />
              <CategoryName color={orangeColor}>전체 상품</CategoryName>
            </>
          ) : (
            <>
              <HiOutlineClipboardList color={blackColor} />
              <CategoryName color={blackColor}>전체 상품</CategoryName>
            </>
          )}
        </LinkStyle>
      </li>
    </CategoryWrap>
  );
}
const CategoryWrap = styled.ul`
  position: fixed;
  background-color: #fff;
  z-index: 9;
  font-weight: 600;
  width: 100%;
  max-width: 500px;
  height: 75px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid var(--color-stroke);
  box-sizing: border-box;
  bottom: 0;
  svg {
    font-size: 24px;
    margin-bottom: 6px;
  }
`;
const LinkStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
`;
const CategoryName = styled.p`
  color: ${(props) => props.color};
`;
export default CategoryBar;
