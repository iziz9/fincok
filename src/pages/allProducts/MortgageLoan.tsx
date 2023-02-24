import React, { useState, useEffect } from 'react';
import { getMortgageLoan } from '../../api/allProductsApi';
import { useInView } from 'react-intersection-observer';
import LoanProductCard from '../../components/allProducts/LoanProductCard';
import { DataType } from './AllProducts';
import styled from 'styled-components';
import AlertModal from '../../utils/AlertModal';

function MortgageLoan() {
  const [mortgageLoanData, setMortgageLoanData] = useState<DataType>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    getMortgageLoan(pageNumber, setMortgageLoanData, setLastPage, setLoading);
  }, [pageNumber]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      if (!lastPage) setPageNumber((prevState) => prevState + 1);
      else
        AlertModal({
          message: '마지막 상품입니다.',
          type: 'alert',
        });
    }
  }, [inView, loading]);

  return (
    <Wrap>
      {mortgageLoanData.map((item: any, index: number) => (
        <div key={index}>
          {mortgageLoanData.length - 1 == index ? (
            <div ref={ref}>
              <LoanProductCard item={item} />
            </div>
          ) : (
            <div>
              <LoanProductCard item={item} />
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
export default MortgageLoan;