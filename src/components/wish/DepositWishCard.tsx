import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function DepositWishCard({ item }: any) {
  return (
    <LinkWrap to={`/detail/${item.itemId}`}>
      <Item bankName={item.bank}>
        <div>
          <h4>{item.bank}</h4>
          <p>최저 금리 {item.minRate}%</p>
        </div>
        <h3>{item.itemName}</h3>
        <span>{item.category}</span>
      </Item>
    </LinkWrap>
  );
}
const LinkWrap = styled(Link)`
  width: 100%;
`;
const Item = styled.div<{ bankName: string }>`
  padding: 30px;
  height: 100px;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  color: rgba(0, 0, 0, 0.7);
  margin: 20px auto;
  background-color: ${(props) =>
    props.bankName === '국민은행'
      ? 'var(--color-bank-yellow)'
      : props.bankName === '신한은행'
      ? 'var(--color-bank-blue)'
      : props.bankName === '하나은행'
      ? 'var(--color-bank-green)'
      : props.bankName === '우리은행'
      ? 'var(--color-bank-puple)'
      : 'var(--color-bg-grey)'};
  div {
    display: flex;
    align-items: center;
    h4 {
      font-size: 18px;
      margin: 0 auto 0 0;
    }
    p {
      font-size: 12px;
      font-weight: bold;
      background-color: white;
      padding: 5px 10px;
      border-radius: 30px;
      color: var(--color-black);
    }
  }
  h3 {
    margin: 13px 0 0;
    font-size: 20px;
    line-height: 1.2em;
    font-weight: bold;
  }
  span {
    font-weight: bold;
    margin-top: auto;
  }
`;
export default DepositWishCard;
