import React, { useEffect, useState } from 'react';
import { getSavingsList } from '../../api/allProductsApi';
import ProductCard from '../../components/common/ProductCard';
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
    if (inView && !loading) {
      if (!lastPage) setPageNumber((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <Wrap>
      {savingsListData.map((item: any, index: number) => (
        <div key={index}>
          {savingsListData.length - 1 == index ? (
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

export default SavingsList;
