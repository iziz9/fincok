import React, { useEffect, useState } from 'react';
import { getSavingsList } from '../../api/allProductsApi';
import DepositProductCard from '../../components/allProducts/DepositProductCard';
import { useInView } from 'react-intersection-observer';
import { DataType } from './AllProducts';
import styled from 'styled-components';

function SavingsList() {
  const [savingsListData, setSavingsListData] = useState<DataType>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    getSavingsList(pageNumber, setSavingsListData, setLastPage, setLoading);
  }, [pageNumber]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      if (!lastPage) setPageNumber((prevState) => prevState + 1);
      // else alert('마지막 상품입니다.')
    }
  }, [inView, loading]);

  return (
    <Wrap>
      {savingsListData.map((item: any, index: number) => (
        <div key={index}>
          {savingsListData.length - 1 == index ? (
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
`


export default SavingsList;
