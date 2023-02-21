import React from 'react'
import { getDepositWishList } from '../../api/api';

function DepositWishList() {
  getDepositWishList(1);
  return (
    <div>
      예금 / 적금 관심상품
      
    </div>
  )
}

export default DepositWishList