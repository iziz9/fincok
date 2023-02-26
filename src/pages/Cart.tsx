import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartPageCard from '../components/common/CartPageCard';
import { Link } from 'react-router-dom';
import { EmptyWishBox } from '../components/wish/DepositWishList';
import { getCookie } from '../utils/cookie';
import AlertLoginState from '../components/common/AlertLoginState';

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const [list, setList] = useState(cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(list));
  }, [list]);

  const deleteItem = (id: number) => {
    const deleted = list.filter((item: any) => {
      return item[0] !== id;
    });
    setList(deleted);
  };

  return (
    <CartWrap>
      <h1>장바구니</h1>
      {getCookie('accessToken') ? (
        <>
          {list.length ? (
            <>
              <p>{list ? list.length : 0}개의 상품이 있습니다.</p>
              <div>
                <Table>
                  <colgroup>
                    <col style={{ width: '80%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">상품</th>
                      <th scope="col">신청/삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item: any) => (
                      <CartPageCard key={item[0]} item={item} deleteItem={deleteItem} />
                    ))}
                  </tbody>
                </Table>
                <div className="spanDiv">
                  <span>장바구니는 로그아웃 시 초기화됩니다.</span>
                  <span>오래 보관하시려면 ❤️관심상품 기능을 이용해주세요.</span>
                </div>
              </div>
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
    margin: 40px 0 30px;
    text-align: right;
    font-size: 15px;
    font-weight: bold;
    color: var(--color-orange);
  }
  .spanDiv {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 20px;
    text-align: center;
    span {
      color: var(--color-orange);
    }
  }
`;

const Table = styled.table`
  width: 100%;

  thead {
    background-color: var(--color-dark-grey);
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;

    th {
      padding: 2px;
    }
  }
`;

export default Cart;
