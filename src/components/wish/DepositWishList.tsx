import React, { useEffect, useState } from 'react';
import { getDepositWishList, requestSetWishList } from '../../api/api';
import DepositWishCard from './DepositWishCard';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

function DepositWishList() {
  const [depositWishData, setDepositWishData] = useState<any>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // const formData = new FormData();
  // formData.append('itemId','35');
  // requestSetWishList(formData);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    getDepositWishList(pageNumber, setDepositWishData, setLastPage, setLoading);
    console.log(depositWishData);
  }, [pageNumber]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      if (!lastPage) setPageNumber((prevState) => prevState + 1);
      // else alert('마지막 상품입니다.')
    }
  }, [inView, loading]);

  return (
    <>
      {depositWishData.map((item: any, index: number) => (
        <div key={index}>
          {depositWishData.length - 1 == index ? (
            <div ref={ref}>
              <DepositWishCard item={item} />
            </div>
          ) : (
            <div>
              <DepositWishCard item={item} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
export default DepositWishList;
