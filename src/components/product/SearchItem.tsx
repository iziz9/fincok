import React from 'react';
import styled from 'styled-components';

type depositsItem = {
  item: {
    bank: string;
    itemId: string;
    itemName: string;
    prefRate: string;
    rate: string;
    maxRate: string;
    minRate: string;
    type: string;
  };
  key: number;
};

const DepositsItem = ({ item }: depositsItem) => {
  const bankName: string = item.bank;

  return (
    <Item bankName={bankName}>
      <div>
        <h4>{item.bank}</h4>
        <p>최대 금리 {item.prefRate || item.maxRate}%</p>
      </div>
      <h3>{item.itemName}</h3>
    </Item>
  );
};

const Item = styled.div<{ bankName: string }>`
  padding: 30px;
  height: 80px;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  color: rgba(0, 0, 0, 0.7);
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
    margin: auto 0 0;
    font-size: 20px;
    line-height: 1.2em;
    font-weight: bold;
  }
`;

export default DepositsItem;
