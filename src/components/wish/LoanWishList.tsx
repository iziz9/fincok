import React, { useCallback, useEffect, useState } from 'react';
import { getLoanWishList, requestDelWishList } from '../../api/wishApi';
import WishCard from './WishCard';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function LoanWishList() {
  const [loanWishData, setLoanWishData] = useState<any>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [abc, setabc] = useState<boolean>(true);

  const { ref, inView } = useInView({
    // threshold: 0,
  });
  const wishClick = async (id: number) => {
    await requestDelWishList(Number(id), setabc);
    setLoanWishData([]);
    setPageNumber(1);
    await getLoanWishList(1, setLoanWishData, setLastPage, setLoading);
  };

  useEffect(() => {
    if (pageNumber !== 1) {
      getLoanWishList(pageNumber, setLoanWishData, setLastPage, setLoading);
    }
  }, [pageNumber]);

  useEffect(() => {
    getLoanWishList(pageNumber, setLoanWishData, setLastPage, setLoading);
  }, []);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      if (!lastPage) setPageNumber((prevState) => prevState + 1);
      // else alert('마지막 상품입니다.')
    }
  }, [inView, loading]);

  return (
    <>
      {!loanWishData?.length ? (
        <EmptyWishBox>
          <img src="/rocket.png" style={{ width: '400px', marginTop: '50px' }} />
          <p>등록된 관심상품이 없습니다</p>
          <Link to="/allproducts">
            <button>전체 상품 둘러보기</button>
          </Link>
        </EmptyWishBox>
      ) : (
        loanWishData?.map((item: any, index: number) => (
          <div key={item.itemId}>
            {loanWishData?.length - 1 == index ? (
              <div ref={ref}>
                <WishCard item={item} wishClick={wishClick} />
              </div>
            ) : (
              <div>
                <WishCard item={item} wishClick={wishClick} />
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
}
const EmptyWishBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
    margin: 20px 0;
  }
  Link {
    width: max-content;
  }
`;

export default LoanWishList;
