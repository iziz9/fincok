import React, { useState } from 'react';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import CartPageCard from '../components/cart/CartPageCard';
import { Link } from 'react-router-dom';
import { EmptyWishBox } from '../components/wish/DepositWishList';
import { getCookie } from '../utils/cookie';
import AlertLoginState from '../components/common/AlertLoginState';

const Cart = () => {
  const cart = localStorage.getItem('cart');
  const [checked, setChecked] = useState<boolean>(false);
  const allChecked = () => {
    setChecked(!checked);
  };
  const removeCart = () => {};

  return (
    <CartWrap>
      <h1>장바구니</h1>
      {getCookie('accessToken') ? (
        <>
          {cart ? (
            <>
              <p>{cart ? cart.length : 0}개의 상품이 있습니다.</p>
              <ButtonBox>
                <button onClick={allChecked}>
                  {checked ? <BsCheckCircleFill /> : <BsCheckCircle />}
                  &nbsp; 전체선택
                </button>
                <button onClick={removeCart}>선택삭제</button>
              </ButtonBox>
              <CartPageCard />
            </>
          ) : (
            <EmptyWishBox>
              <img src="/rocket.png" style={{ width: '400px', marginTop: '50px' }} />
              <p>장바구니에 담은 상품이 없습니다</p>
              <Link to="/allproducts">
                <button>전체 상품 둘러보기</button>
              </Link>
            </EmptyWishBox>
          )}
        </>
      ) : (
        <AlertLoginState text={'로그인 후 이용 가능합니다.'} />
      )}
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
    margin: 20px 0 30px;
    text-align: right;
    font-size: 15px;
    color: var(--color-orange);
  }
`;
const ButtonBox = styled.div`
  display: flex;
  margin-bottom: 30px;
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
