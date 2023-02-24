import { useState, useEffect, useCallback } from 'react';
import { getRecommendProducts } from '../api/api';
import ProductItem from '../components/product/ProductItem';
import { hideLoading, showLoading } from '../store/loadingSlice';
import AlertLoginState from '../components/common/AlertLoginState';
import styled from 'styled-components';
import { getCookie } from '../utils/cookie';
import { useAppDispatch, useAppSelector } from '../hooks/useDispatchHooks';
import { useInView } from 'react-intersection-observer';
import { NoList } from './Home';

function Recommend() {
  const token = getCookie('accessToken');
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState<number>(2);
  const [last, setLast] = useState<boolean>(false);
  const [ref, inView] = useInView();

  // 맞춤 상품 조회
  const getCustomRecommend = useCallback(
    async (setProducts: any, setLast: any) => {
      if (token) {
        try {
          dispatch(showLoading());
          const response = await getRecommendProducts(page);
          setProducts((prevState: any) => [...prevState, ...response.content]);
          setLast(response.last);
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(hideLoading());
        }
      } else {
        console.log('토큰 없음');
        return null;
      }
    },
    [page],
  );

  // api 호출 함수가 바뀔 때 마다 실행
  useEffect(() => {
    getCustomRecommend(setProducts, setLast);
  }, [getCustomRecommend]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 마지막 페이지 일 때
    if (inView && last === false) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView]);

  return (
    <Container>
      {token ? (
        <Products>
          <h4>
            <span>{name}</span> 님에게
            <br />
            맞춤 상품을 추천드려요.
          </h4>
          {Array.isArray(products) ? (
            products.map((item, idx) => {
              return <ProductItem item={item} key={idx} />;
            })
          ) : (
            <NoList>
              <p>추천 상품이 없습니다.</p>
            </NoList>
          )}
          <div ref={ref}></div>
        </Products>
      ) : (
        <AlertLoginState text={'로그인 후 이용 가능합니다.'} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: var(--color-white);
  box-sizing: border-box;
  padding: 50px 35px;
`;

const Products = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  h4 {
    font-size: 26px;
    line-height: 1.5em;
    letter-spacing: -1.5px;
    margin-bottom: 15px;
    span {
      color: var(--color-orange);
    }
  }
  div {
  }
`;

export default Recommend;
