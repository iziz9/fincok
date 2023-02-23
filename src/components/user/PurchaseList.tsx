import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { getDepositPurchase, getLoanPurchase } from '../../api/api';
import PurchaseCard from './PurchaseCard';
import styled from 'styled-components';
import { Pagination } from 'swiper';

function PurchaseList() {
  const [depositData, setDepositData] = useState([]);
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    (async () => {
      await getDepositPurchase(setDepositData);
      await getLoanPurchase(setLoanData, setLoading);
    })();
  }, []);

  useEffect(() => {
    setAllData([...depositData, ...loanData]);
  }, [loading]);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <Wrap>
      <h3>가입상품</h3>
      <p>가입한 {allData.length}개의 상품이 있습니다.</p>
      <Swiper
        slidesPerView={1.3}
        spaceBetween={15}
        pagination={pagination}
        modules={[Pagination]}
        loop={false}
      >
        {allData?.length ? (
          allData?.map((item: any) => {
            return (
              <SwiperSlide key={item.purchaseId}>
                <PurchaseCard item={item} key={item.purchaseId} />
              </SwiperSlide>
            );
          })
        ) : (
          <p>구매 상품이 없습니다.</p>
        )}
      </Swiper>
    </Wrap>
  );
}
const Wrap = styled.div`
  margin-top: 50px;
  h3 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  p {
    text-align: right;
    color: var(--color-orange);
    font-size: 16px;
  }
  .swiper{
    height: 280px;
  }
  .swiper-pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex;
    gap: 5px;
  }
  .swiper-pagination-bullet {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-dark-grey);
    color: #fff;
  }
`;

export default PurchaseList;
