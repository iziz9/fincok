import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = { item: DataType };

function ProductCard({ item }: Props) {
  const navigate = useNavigate();
  const category = item.category.includes('대출') ? 'loan' : 'deposit';
  let logo = '';

  switch (item.bank) {
    case '부산은행':
      logo = 'bank-bs.png';
      break;
    case '한국씨티은행':
      logo = 'bank-ct.png';
      break;
    case '대구은행':
      logo = 'bank-dg.png';
      break;
    case '광주은행':
      logo = 'bank-gj.png';
      break;
    case '하나은행':
      logo = 'bank-hn.png';
      break;
    case '중소기업은행':
      logo = 'bank-ibk.png';
      break;
    case '국민은행':
      logo = 'bank-kb.png';
      break;
    case '농협은행':
      logo = 'bank-nh.png';
      break;
    case '한국스탠다드차타드은행':
      logo = 'bank-sc.png';
      break;
    case '신한은행':
      logo = 'bank-sh.png';
      break;
    case '수협은행':
      logo = 'bank-suh.png';
      break;
    case '우리은행':
      logo = 'bank-wr.png';
      break;
  }

  return (
    <LinkWrap onClick={() => navigate(`/detail/${category}/${item.itemId}`)}>
      <Item bankName={item.bank}>
        <div>
          <h4>{item.bank}</h4>
          <p>
            {category === 'deposit' ? '우대' : '최저대출'}금리 {item.prefRate || item.minRate}%
          </p>
        </div>
        <h3>{item.itemName}</h3>
        <span>{item.category}</span>
        <div className="logo">
          <img src={`/${logo}`} style={{ width: '50px' }} />
        </div>
      </Item>
    </LinkWrap>
  );
}
const LinkWrap = styled.div`
  width: 100%;
  cursor: pointer;
`;
const Item = styled.div<{ bankName: string }>`
  position: relative;
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
      ? 'var(--color-bank-sky)'
      : props.bankName === '하나은행'
      ? 'var(--color-bank-green)'
      : props.bankName === '우리은행'
      ? 'var(--color-bank-puple)'
      : props.bankName === '한국스탠다드차타드은행'
      ? 'var(--color-bank-lightgreen)'
      : props.bankName === '농협은행'
      ? 'var(--color-bank-blue)'
      : props.bankName === '한국씨티은행'
      ? 'var(--color-bank-teal)'
      : props.bankName === '중소기업은행'
      ? 'var(--color-bank-orange)'
      : 'var(--color-bg-grey)'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
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
  .logo {
    position: absolute;
    right: 30px;
    bottom: 20px;
  }
`;

export type DataType = {
  itemId: string;
  category: string;
  bank: string;
  itemName: string;
  type: string;
  join: string;
  limit: string;
  preference: any;
  target: any;
  rate: string;
  prefRate?: string;
  mature: string;
  minRate?: number;
};

export default ProductCard;
