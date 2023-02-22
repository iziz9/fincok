import React, { useEffect, useState } from 'react';
import { getDepositWishList, requestDelWishList } from '../../api/wishApi';
import WishCard from './WishCard';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function DepositWishList() {
  const [depositWishData, setDepositWishData] = useState<any>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [abc, setabc] = useState<boolean>(true);

  const { ref, inView } = useInView({
    // threshold: 0,
  });
  const wishClick = async (id: number) => {
    console.log('클릭함수 시작');
    await requestDelWishList(Number(id), setabc);
    setDepositWishData([]);
    setPageNumber(1);    
    await getDepositWishList(1, setDepositWishData, setLastPage, setLoading);
    console.log('클릭함수 끝부분 콘솔', depositWishData);
  }

  useEffect(() => {
    console.log('무한스크롤 useEffect 시작');
    console.log('pageNum', pageNumber);
    if (pageNumber !== 1) {
      console.log('1페이지가 아닌데요?')
      getDepositWishList(pageNumber, setDepositWishData, setLastPage, setLoading);
      console.log('무한스크롤 useEffect중간', depositWishData);
    } else {
      console.log('1페이지가 들어왔습니다.')
      console.log('무한스크롤 useEffect중간', depositWishData);
    }
    console.log('무한스크롤 마지막', depositWishData);
  }, [pageNumber]);

  useEffect(() => {
    console.log('기본 useEffect 시작');
    getDepositWishList(pageNumber, setDepositWishData, setLastPage, setLoading);
    console.log('첫 실행 useFfect 마지막', depositWishData);
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
      {!depositWishData?.length ? (
        <EmptyWishBox>
          <img src="/rocket.png" style={{ width: '400px', marginTop: '50px' }} />
          <p>등록된 관심상품이 없습니다</p>
          <Link to="/allproducts">
            <button>전체 상품 둘러보기</button>
          </Link>
        </EmptyWishBox>
      ) : (
        depositWishData?.map((item: any, index: number) => (
          <div key={item.itemId}>
            {depositWishData?.length - 1 == index ? (
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

export default DepositWishList;
