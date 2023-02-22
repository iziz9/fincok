import React from 'react';
import styled from 'styled-components';

function CartPageCard() {
  return (
    <Table>
      <colgroup>
        {/* <col style={{ width: '25%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '20%' }} /> */}
      </colgroup>
      <thead>
        <tr>
          <th scope="col">선택</th>
          <th scope="col">상품카드</th>
          <th scope="col">신청/삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>체크박스</td>
          <td>상품카드삽입</td>
          <td>신청/삭제버튼 세로</td>
        </tr>
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  color: green;
`;

export default CartPageCard;
