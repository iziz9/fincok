import React, { useState, useEffect } from 'react';
import { getDepositPurchase, getLoanPurchase, removePurchase } from '../../api/api';
import PurchaseCard from './PurchaseCard';
import styled from 'styled-components';

function PurchaseList() {
  const [depositData, setDepositData] = useState([]);
  const [loanData, setLoanData] = useState([]);
  const [allData, setAllData] = useState([]);

  const removeButton = (itemId: number, itemName: string) => {
    try {
      removePurchase(Number(itemId));
      alert(`${itemName} 상품 신청이 취소되었습니다.`);
      // setAllData()
      console.log(allData);
    } catch (err) {
      alert('에러가 발생했습니다.');
    }
  };

  // const newList = () => {
  //   for ()
  // }

  useEffect(() => {
    const getList = async () => {
      try {
        const depositList = await getDepositPurchase();
        const loanList = await getLoanPurchase();
        setDepositData(depositList.data.resultData);
        setLoanData(loanList.data.resultData);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);

  useEffect(() => {
    setAllData([...depositData, ...loanData]);
  }, [depositData, loanData]);

  return (
    <Wrap>
      <h3>가입상품</h3>
      <p>가입한 {allData.length}개의 상품이 있습니다.</p>
      <div>
        {allData?.length ? (
          allData?.map((item: any) => {
            return (
              <div key={item.purchaseId}>
                <PurchaseCard item={item} key={item.purchaseId} removeButton={removeButton} />
              </div>
            );
          })
        ) : (
          <p>구매 상품이 없습니다.</p>
        )}
      </div>
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

export default PurchaseList;
