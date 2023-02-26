import React, { useState, useEffect } from 'react';
import {
  getCharterLoan,
  getMortgageLoan,
  getSavingsList,
  getDepositList,
} from '../../api/allProductsApi';
import { useInView } from 'react-intersection-observer';
import ProductCard from '../common/ProductCard';
import { DataType } from '../../pages/AllProducts';
import styled from 'styled-components';

const AllProductList = () => {
  const [data, setData] = useState<DataType>([]);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const params = location.pathname.split('/')[2];

  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    switch (params) {
      case 'charterloan':
        setTitle('전세자금대출');
        break;
      case 'mortgageloan':
        setTitle('주택담보대출');
        break;
      case 'savinglist':
        setTitle('적금상품');
        break;
      case 'depositlist':
        setTitle('예금상품');
        break;
    }
  }, []);

  useEffect(() => {
    switch (params) {
      case 'charterloan':
        getCharterLoan(pageNumber, setData, setLastPage, setLoading);
        break;
      case 'mortgageloan':
        getMortgageLoan(pageNumber, setData, setLastPage, setLoading);
        break;
      case 'savinglist':
        getSavingsList(pageNumber, setData, setLastPage, setLoading);
        break;
      case 'depositlist':
        getDepositList(pageNumber, setData, setLastPage, setLoading);
        break;
    }
  }, [pageNumber]);

  useEffect(() => {
    if (inView && !loading) {
      if (!lastPage) setPageNumber((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <Wrap>
      <h1>{title}</h1>
      {data.map((item: any, index: number) => (
        <div key={index}>
          {data.length - 1 == index ? (
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
};
const Wrap = styled.div`
  padding: 0 30px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-bottom: 50px;

  h1 {
    margin: 40px 0;
  }
`;

export default AllProductList;
