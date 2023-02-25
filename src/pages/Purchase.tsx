import React, { useState, useEffect } from 'react';
import { getDepositPurchase, getLoanPurchase, removePurchase } from '../api/api';
import { getWishCount } from '../api/wishApi';
import PurchaseCard from '../components/user/PurchaseCard';
import styled from 'styled-components';

function Purchase() {
  const [depositData, setDepositData] = useState([]);
  const [loanData, setLoanData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [count, setCount] = useState([]);
  const [toggle, setToggle] = useState(true);

  const getList = async () => {
    try {
      const depositList = await getDepositPurchase();
      const loanList = await getLoanPurchase();
      const countOnPurchase = await getWishCount();
      setCount(countOnPurchase.data.resultData);
      setDepositData(depositList.data.resultData);
      setLoanData(loanList.data.resultData);
    } catch (err) {
      console.log(err);
    }
  };

  const removeButton = (itemId: number, itemName: string) => {
    try {
      removePurchase(Number(itemId));
      alert(`${itemName} 상품 신청이 취소되었습니다.`);
      getList();
    } catch (err) {
      alert('에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setAllData([...depositData, ...loanData]);
  }, [depositData, loanData]);
  // allData?.map((item: any) => console.log(item));

  return (
    <main>
      <Wrap>
        <h1>가입상품</h1>
        <p>가입(신청)중인 {count}개의 상품이 있습니다.</p>
        <div>
          {allData?.length ? (
            allData?.map((item: any) => {
              return item.status === '신청완료' ? (
                <div key={item.purchaseId}>
                  <PurchaseCard item={item} key={item.purchaseId} removeButton={removeButton} />
                </div>
              ) : null;
            })
          ) : (
            <p>구매 상품이 없습니다.</p>
          )}
        </div>
      </Wrap>
    </main>
  );
}
const Wrap = styled.div`
  padding: 20px 35px 60px;
  margin-top: 50px;
  h1 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  p {
    text-align: right;
    color: var(--color-orange);
    font-size: 16px;
  }
  .swiper {
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
export default Purchase;
