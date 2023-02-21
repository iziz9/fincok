import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import ProductItem from '../components/product/ProductItem';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const [user, setUser] = useState<String>('');
  const [cart, setCart] = useState<String>('0');
  const [products, setProducts] = useState({});

  useEffect(() => {
    async function getRecommendProducts() {
      try {
        const response = await getProducts();
        console.log(response);
        setProducts(response.data.resultData);
      } catch (error) {
        console.log('에러 발생!');
      }
    }
    getRecommendProducts();
  }, []);

  return (
    <Container>
      <Title>
        {user !== '' ? (
          <h3>
            <span>{user}</span> 님, 안녕하세요
            <br /> 추천 상품을 확인해 보세요
          </h3>
        ) : (
          <h3>
            <span>로그인</span>을 하시면
            <br /> 추천 상품을 확인할 수 있습니다.
          </h3>
        )}
      </Title>
      <AllProducts>
        <p>
          <span>로그인</span> 하러 가기
        </p>
        <Link to={'/login'}>GO !</Link>
      </AllProducts>
      <MyPage>
        <Cart>
          <p>가입한 상품</p>
          <p>{cart} 건</p>
        </Cart>
        <Link to={'/cart'}>장바구니 보러가기</Link>
      </MyPage>
      <Products>
        <h4>추천 상품</h4>
        <Swiper
          slidesPerView={1.3}
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          loop={false}
          modules={[Pagination]}
        >
          {Array.isArray(products) ? (
            products.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <ProductItem item={item} key={idx} />
                </SwiperSlide>
              );
            })
          ) : (
            <NoList>
              <p>추천 상품이 없습니다.</p>
            </NoList>
          )}
        </Swiper>
      </Products>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: var(--color-white);
  box-sizing: border-box;
  padding: 45px 35px 160px;
  .swiper-wrapper {
    padding-bottom: 42px;
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: var(--color-bg-grey);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: var(--color-black);
  }
`;

const Title = styled.div`
  h3 {
    font-size: 24px;
    line-height: 1.5em;
    span {
      color: var(--color-orange);
    }
  }
`;

const AllProducts = styled.div`
  display: flex;
  flex-flow: column;
  margin: 20px 0 40px;
  letter-spacing: -0.5px;
  font-weight: bold;
  span {
    color: var(--color-orange);
  }
  a {
    width: 55px;
    height: 55px;
    text-align: center;
    line-height: 56px;
    border-radius: 50px;
    background-color: var(--color-orange);
    color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(247, 68, 64, 0.2);
    margin-top: 20px;
    font-weight: bold;
    :hover {
      background-color: var(--color-black);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    }
  }
`;

const MyPage = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 115px;
  padding: 27px 35px 18px;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: var(--color-orange);
  color: var(--color-white);
  letter-spacing: -0.5px;
  a {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding-top: 16px;
    color: var(--color-white);
    font-size: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
  }
`;

const Cart = styled.div`
  display: flex;
  p {
    font-size: 18px;
    :last-child {
      margin-left: auto;
    }
  }
`;

const Products = styled.div`
  margin-top: 50px;
  h4 {
    font-size: 18px;
    line-height: 1.7em;
    letter-spacing: -1.5px;
    margin-bottom: 15px;
    font-weight: bold;
  }
`;

export const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-grey);
  height: 180px;
  border-radius: 15px;
  margin-top: -40px;
  p {
    font-size: 16px;
    color: var(--color-dark-grey);
  }
`;

export default Home;
