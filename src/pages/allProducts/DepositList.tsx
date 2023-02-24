import React, { useState, useEffect } from 'react';
import { getDepositList } from '../../api/allProductsApi';
import { useInView } from 'react-intersection-observer';
import DepositProductCard from '../../components/allProducts/DepositProductCard';
import { DataType } from './AllProducts';
import styled from 'styled-components';

function DepositList() {
  const [depositData, setDepositListData] = useState<DataType>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    getDepositList(pageNumber, setDepositListData, setLastPage, setLoading);
  }, [pageNumber]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      if (!lastPage) setPageNumber((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <Wrap>
      {depositData.map((item: any, index: number) => (
        <div key={index}>
          {depositData.length - 1 == index ? (
            <div ref={ref}>
              <DepositProductCard item={item} />
            </div>
          ) : (
            <div>
              <DepositProductCard item={item} />
            </div>
          )}
        </div>
      ))}
    </Wrap>
  );
}
const Wrap = styled.div`
  padding: 0 30px;
`;

export default DepositList;
