import React from 'react'
import CartCard from './CartCard'
import styled from 'styled-components'

function CartList() {
  return (
    <CartListWrap>
      <h3>가입상품</h3>
      <p>가입한 n개의 상품이 있습니다.</p>
      < CartCard />
    </CartListWrap>
  )
}
const CartListWrap = styled.div`
  margin-top: 50px;
  h3{
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  p{
    text-align: right;
    color: var(--color-orange);
    font-size: 16px;
  }
`

export default CartList