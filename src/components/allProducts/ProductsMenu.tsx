import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BoxWrap, LinkBox } from './MyProducts';

function ProductsMenu() {
  return (
    <BoxWrap>
      <div>
        <h3>모으기</h3>
        <ListWrap>
          <li>
            <LinkBox to="savinglist">
              <img src="/deposit1.png" alt="적금" style={{ width: '80px' }} />
              <p>적금</p>
            </LinkBox>
          </li>
          <li>
            <LinkBox to="depositlist">
              <img src="/deposit2.png" alt="예금" style={{ width: '80px' }} />
              <p>예금</p>
            </LinkBox>
          </li>
        </ListWrap>
      </div>
      <div style={{ marginTop: '50px' }}>
        <h3>빌리기</h3>
        <ListWrap>
          <li>
            <LinkBox to="mortgageloan">
              <img src="/loan1.png" alt="주택담보대출" style={{ width: '80px' }} />
              <p>주택담보대출</p>
            </LinkBox>
          </li>
          <li>
            <LinkBox to="charterloan">
              <img src="/loan2.png" alt="전세자금대출" style={{ width: '80px' }} />
              <p>전세자금대출</p>
            </LinkBox>
          </li>
        </ListWrap>
      </div>
    </BoxWrap>
  );
}

const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    margin-top: 15px;
    width: 50%;
  }
`;

export default ProductsMenu;
