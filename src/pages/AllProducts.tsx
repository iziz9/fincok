import React from 'react';
import styled from 'styled-components';
import MyProducts from '../components/allProducts/MyProducts';
import ProductsMenu from '../components/allProducts/ProductsMenu';

function AllProducts() {
  return (
    <AllProductsWrap>
      <Title>전체 상품</Title>
      <MyProducts />
      <ProductsMenu />
    </AllProductsWrap>
  );
}
const Title = styled.h1`
  margin-top: 50px;
  margin-bottom: 30px;
  font-weight: bold;
`;
const AllProductsWrap = styled.div`
  padding: 20px 35px 60px;
`;

export type DataType = Array<{
  itemId: string;
  category: string;
  bank: string;
  itemName: string;
  type: string;
  join: string;
  limit: string;
  preference?: string;
  target: any;
  rate: string;
  prefRate: string;
  mature: string;
}>;
export default AllProducts;
