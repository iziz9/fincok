import React from 'react'
import CartCard from './CartCard'

function CartList() {
  return (
    <div>
      <h3>가입상품</h3>
      <p>가입한 n개의 상품이 있습니다.</p>
      < CartCard />
    </div>
  )
}

export default CartList