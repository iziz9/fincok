import React from 'react';
import styled from 'styled-components';
import MyProducts from '../components/allProducts/MyProducts';
import ProductsMenu from '../components/allProducts/ProductsMenu';

function AllProducts() {
  return (
    <AllProductsWrap>
      <h1>전체 상품</h1>
      <MyProducts />
      <ProductsMenu />
    </AllProductsWrap>
  );
}
const AllProductsWrap = styled.div`
  padding: 20px 35px;
`;
export default AllProducts;
