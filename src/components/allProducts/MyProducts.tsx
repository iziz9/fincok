import React from 'react';
import styled from 'styled-components';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { TiHeartOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';

function MyProducts() {
  return (
    <BoxWrap>
      <h3>나의 상품 바구니</h3>
      <FlexBox>
        <LinkBox to="/user">
          {/* <FaRegMoneyBillAlt size="48" /> */}
          <img src="/icon5.png" alt="가입중인 상품" />
          <p>가입신청 n개</p>
        </LinkBox>
        <CenterLine>center line</CenterLine>
        <LinkBox to="/cart">
          {/* <TiHeartOutline size="48" /> */}
          <img src="/icon6.png" alt="관심상품" />
          <p>관심상품 n개</p>
        </LinkBox>
      </FlexBox>
    </BoxWrap>
  );
}
const BoxWrap = styled.div`
  width: 100%;
  padding: 40px;
  background-color: var(--color-background);
  box-sizing: border-box;
  margin-top: 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const LinkBox = styled(Link)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    padding-top: 10px;
    font-size: 16px;
  }
  :hover {
    svg {
      color: var(--color-orange);
    }
    p {
      color: var(--color-orange);
    }
  }
`;
const CenterLine = styled.div`
  text-indent: -9999px;
  border-left: 2px solid var(--color-black);
  opacity: 0.2;
  margin: 15px 0;
`;

export default MyProducts;
