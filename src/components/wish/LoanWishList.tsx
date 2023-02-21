import React from 'react'
import { getLoanWishList } from '../../api/api';

function LoanWishList() {
  getLoanWishList(1);
  return (
    <div>LoanWishList</div>
  )
}

export default LoanWishList