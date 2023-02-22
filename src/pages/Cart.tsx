import React, { useState } from 'react';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import CartPageCard from '../components/cart/CartPageCard';

const Cart = () => {
  const cart = localStorage.getItem('cart');
  const [checked, setChecked] = useState<boolean>(false);
  const allChecked = () => {
    setChecked(!checked);
  };
  const removeCart = () => {};

  return (
    <CartWrap>
      <h2>장바구니 상품</h2>
      <p>{cart ? cart.length : 0}개의 상품이 있습니다.</p>
      <ButtonBox>
        <button onClick={allChecked}>
          전체선택 &nbsp;
          {checked ? <BsCheckCircleFill /> : <BsCheckCircle />}
        </button>
        <button onClick={removeCart}>선택삭제</button>
      </ButtonBox>
      <CartPageCard />
    </CartWrap>
  );
};

const CartWrap = styled.div`
  padding: 35px;
  h2 {
    font-size: 32px;
    margin-bottom: 20px;
  }
  p {
    text-align: right;
    font-size: 15px;
    color: var(--color-orange);
  }
`;
const ButtonBox = styled.div`
  display: flex;
  button {
    font-size: 15px;
    background-color: #fff;
    color: var(--color-black);
    border: transparent;
    padding: 0;
    :hover {
      background-color: #fff;
    }
    :nth-child(2) {
      margin-left: 20px;
    }
  }
`;
export default Cart;
