import React, { useState, useEffect } from 'react';
import { getMortgageLoan } from '../../api/allProductsApi';
import { useInView } from 'react-intersection-observer';
import ProductCard from '../../components/allProducts/ProductCard';
import { DataType } from './AllProducts';

function MortgageLoan() {
  const [mortgageLoanData, setMortgageLoanData] = useState<DataType>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const { ref, inView } = useInView({

  });

  useEffect(() => {
    getMortgageLoan(pageNumber, setMortgageLoanData, setLastPage, setLoading);
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
      {mortgageLoanData.map((item: any, index: number) => (
        <div key={index}>
          {mortgageLoanData.length - 1 == index ? (
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
    </>
  );
}
export default MortgageLoan