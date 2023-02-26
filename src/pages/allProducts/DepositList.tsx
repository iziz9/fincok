import React, { useState, useEffect } from 'react';
import { getDepositList } from '../../api/allProductsApi';
import { useInView } from 'react-intersection-observer';
import ProductCard from '../../components/common/ProductCard';
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
              <ProductCard item={item} />
            </div>
          ) : (
            <div>
              <ProductCard item={item} />
            </div>
          )}
        </div>
      ))}
    </Wrap>
  );
}
const Wrap = styled.div`
  padding: 0 30px;
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

export default DepositList;
