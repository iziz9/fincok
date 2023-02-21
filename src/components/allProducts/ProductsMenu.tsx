import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ProductsMenu() {
  return (
    <MenuBox>
      <h3>모으기</h3>
      <ListWrap>
        <li>
          <LinkBox to="savinglist">
            {/* <BsPiggyBank /> */}
            <img src="/icon1.png" alt="적금" />
            <p>적금</p>
          </LinkBox>
        </li>
        <li>
          <LinkBox to="depositlist">
            {/* <GiMoneyStack /> */}
            <img src="/icon2.png" alt="예금" />
            <p>예금</p>
          </LinkBox>
        </li>
      </ListWrap>
      <ContentsLine>컨텐츠 라인</ContentsLine>
      <h3>빌리기</h3>
      <ListWrap>
        <li>
          <LinkBox to="mortgageloan">
            {/* <GiReceiveMoney /> */}
            <img src="/icon3.png" alt="주택담보대출" />
            <p>주택담보대출</p>
          </LinkBox>
        </li>
        <li>
          <LinkBox to="charterloan">
            {/* <GiTakeMyMoney /> */}
            <img src="/icon4.png" alt="전세자금대출" />
            <p>전세자금대출</p>
          </LinkBox>
        </li>
      </ListWrap>
    </MenuBox>
  );
}

const MenuBox = styled.div`
  padding: 0 25px;
  background-color: var(--color-background);
  box-sizing: border-box;
  margin-top: 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
  h3 {
    font-size: 18px;
    font-weight: 600;
    padding: 30px 0;
  }
`;
const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
  }
`;
const ContentsLine = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--color-black);
  text-indent: -9999px;
`;
const LinkBox = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    font-size: 48px;
  }
  p {
    margin: 20px 0;
    font-size: 16px;
    text-align: center;
  }
  :hover {
    color: var(--color-orange);
  }
`;

export default ProductsMenu;
