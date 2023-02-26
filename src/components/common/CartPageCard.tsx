import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/useDispatchHooks';
import { useNavigate } from 'react-router-dom';
import { purchaseAlert } from '../../api/api';

function CartPageCard({ item, deleteItem }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let logo = '';
  switch (item[2]) {
    case '부산은행':
      logo = '/bank-bs.png';
      break;
    case '한국씨티은행':
      logo = '/bank-ct.png';
      break;
    case '대구은행':
      logo = '/bank-dg.png';
      break;
    case '광주은행':
      logo = '/bank-gj.png';
      break;
    case '하나은행':
      logo = '/bank-hn.png';
      break;
    case '중소기업은행':
      logo = '/bank-ibk.png';
      break;
    case '국민은행':
      logo = '/bank-kb.png';
      break;
    case '농협은행':
      logo = '/bank-nh.png';
      break;
    case '한국스탠다드차타드은행':
      logo = '/bank-sc.png';
      break;
    case '신한은행':
      logo = '/bank-sh.png';
      break;
    case '수협은행':
      logo = '/bank-suh.png';
      break;
    case '우리은행':
      logo = '/bank-wr.png';
      break;
  }

  return (
    <Tr>
      <td>
        <Card
          bankName={item[2]}
          onClick={() =>
            navigate(
              `/detail/${item[3] === '적금' || item[3] === '정기예금' ? 'deposit' : 'loan'}/${
                item[0]
              }`,
            )
          }
        >
          <div className="bank">{item[2]}</div>
          <div className="name">{item[1]}</div>
          <div className="category">{item[3]}</div>
          <div className="rate">금리 {item[4]}%</div>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Card>
      </td>
      <td>
        <div className="buttonbox">
          <button
            onClick={() => {
              purchaseAlert({ id: item[0], deleteItem, dispatch });
            }}
          >
            신청
          </button>
          <button onClick={() => deleteItem(item[0], dispatch)}>삭제</button>
        </div>
      </td>
    </Tr>
  );
}

const Tr = styled.tr`
  width: 100%;
  vertical-align: middle;
  border-bottom: 1px solid gray;

  td {
    vertical-align: middle;
    padding: 10px 0;
  }
  .check {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }
  .buttonbox {
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
      background-color: var(--color-dark-grey);
      width: 60px;
      height: 30px;
      margin: 0 auto;
      :hover {
        background-color: var(--color-orange);
      }
    }
  }
`;

const Card = styled.div<{ bankName: string }>`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 25px 15px 15px 30px;
  box-sizing: border-box;
  border-radius: 20px;
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
  .name {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
  }
  .category {
    font-size: 12px;
    font-weight: bold;
    color: var(--color-dark-grey);
  }
  .rate {
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    position: absolute;
    right: 18px;
    top: 18px;
    background-color: #fff;
    width: 80px;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
  }
  .category {
    margin-top: 30px;
  }
  .logo {
    position: absolute;
    right: 20px;
    bottom: 0;

    img {
      width: 60px;
    }
  }
`;

export default CartPageCard;
