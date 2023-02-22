import React from 'react';
import AlertLoginState from '../components/common/AlertLoginState';
import { getCookie } from '../utils/cookie';

function Recommend() {
  return (
    <div>
      {getCookie('accessToken') ? (
        <>
          <h1>맞춤추천</h1>
          <div>
            <div>맞춤추천상품 목록</div>
          </div>
        </>
      ) : (
        <AlertLoginState text={'로그인 후 이용 가능합니다.'} />
      )}
    </div>
  );
}

export default Recommend;
