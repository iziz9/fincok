import React from 'react'
import { getLoanWishList } from '../../api/wishApi';

function LoanWishList() {
  getLoanWishList(1);
  return (
    <div>LoanWishList</div>
  )
}

export default LoanWishList