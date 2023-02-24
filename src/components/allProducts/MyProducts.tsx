import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getWishCount } from '../../api/wishApi';
import AlertModal from '../../utils/AlertModal';
import { getCookie } from '../../utils/cookie';

function MyProducts() {
  const cart = JSON.parse(localStorage.getItem('cart')!);
  const [wishList, setWishList] = useState(0);
  const token = getCookie('accessToken');

  useEffect(() => {
    const getAssignCount = async () => {
      try {
        const res = await getWishCount();
        setWishList(res.data.resultData);
      } catch (err) {
        console.log(err);
      }
    };
    token ? getAssignCount() : null;
  }, []);

  return (
    <BoxWrap>
      <h3>나의 상품 바구니</h3>
      <FlexBox>
        <LinkBox to="/user">
          <img src="/writing.png" alt="가입중인 상품" style={{ width: '70px' }} />
          {token ? <p>가입신청 {wishList}개</p> : <p>가입신청 목록</p>}
        </LinkBox>
        <LinkBox to="/cart">
          <img src="/bag.png" alt="관심상품" style={{ width: '70px' }} />
          {token ? <p>장바구니 {cart.length}개</p> : <p>장바구니 목록</p>}
        </LinkBox>
      </FlexBox>
      <FlexBox>
        {!token ? (
          <p style={{ marginTop: '15px', fontSize: '12px', color: 'var(--color-orange)' }}>
            로그인 후 이용 가능합니다.
          </p>
        ) : (
          ''
        )}
      </FlexBox>
    </BoxWrap>
  );
}
export const BoxWrap = styled.div`
  width: 100%;
  padding: 40px;
  background-color: var(--color-dark-grey);
  box-sizing: border-box;
  margin-top: 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
  h3 {
    width: 250px;
    margin: auto;
    font-size: 18px;
    font-weight: 600;
    color: white;
    background-color: var(--color-orange);
    padding: 3px;
    border-radius: 50px;
    text-align: center;
  }
  p {
    color: white;
  }
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;
export const LinkBox = styled(Link)`
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    padding-top: 10px;
    font-size: 16px;
  }
  :hover {
    svg {
      color: var(--color-orange);
    }
    p {
      color: var(--color-orange);
    }
  }
`;

export default MyProducts;
