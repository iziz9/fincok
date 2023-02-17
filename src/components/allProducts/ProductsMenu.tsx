import React from 'react';
import { Link } from 'react-router-dom';
import { BsPiggyBank } from 'react-icons/bs';
import { GiMoneyStack, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import styled from 'styled-components';

function ProductsMenu() {
  return (
    <MenuBox>
      <h3>모으기</h3>
      <ListWrap>
        <li>
          <LinkBox to="/">
            <BsPiggyBank />
            <p>적금</p>
          </LinkBox>
        </li>
        <li>
          <LinkBox to="/">
            <GiMoneyStack />
            <p>예금</p>
          </LinkBox>
        </li>
      </ListWrap>
      <ContentsLine>컨텐츠 라인</ContentsLine>
      <h3>빌리기</h3>
      <ListWrap>
        <li>
          <LinkBox to="/">
            <GiReceiveMoney />
            <p>주택담보대출</p>
          </LinkBox>
        </li>
        <li>
          <LinkBox to="/">
            <GiTakeMyMoney />
            <p>전세자금대출</p>
          </LinkBox>
        </li>
      </ListWrap>
    </MenuBox>
  );
}

const MenuBox = styled.div`
  padding: 25px;
  background-color: var(--color-background);
  box-sizing: border-box;
  margin-top: 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
  h3 {
    font-size: 20px;
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
  :hover{
    color: var(--color-orange); 
  }
`;

export default ProductsMenu;
