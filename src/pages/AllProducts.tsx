import React from 'react'
import styled from 'styled-components'
import MyProducts from '../components/allProducts/MyProducts'
import ProductMenu from '../components/allProducts/ProductMenu'

function AllProducts() {
  return (
    <AllProductsWrap>
      <h2>전체 상품</h2>
      <MyProducts /> 
      <ProductMenu/>
    </AllProductsWrap>
  )
}
const AllProductsWrap = styled.div`
  padding: 35px;
  h2{
    font-size: 32px;
  }
`
export default AllProducts