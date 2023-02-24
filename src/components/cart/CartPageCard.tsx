import React, { useState } from 'react';
import styled from 'styled-components';
import { hideLoading, showLoading } from '../../store/loadingSlice';
import { useAppDispatch } from '../../hooks/useDispatchHooks';
import { useNavigate } from 'react-router-dom';
import { getPurchaseLength, requestPurchase } from '../../api/api';
import AlertModal from '../../utils/AlertModal';

function CartPageCard({ storage, deleteItem }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [itemId, setItemId] = useState();

  const purchase = async (id: number) => {
    const res = await getPurchaseLength();
    if (res <= 10) {
      const formData = new FormData();
      formData.append('itemId', String(id));
      try {
        dispatch(showLoading());
        const res = await requestPurchase(formData);
        if (res.data.resultCode === 'duplicate') {
          AlertModal({
            message: '이미 신청한 상품입니다.',
            type: 'alert',
          });
        } else if (res.data.resultCode === 'failed') {
          AlertModal({
            message: '신청할 수 없는 상품입니다. 해당 은행으로 문의 바랍니다.',
            type: 'alert',
          });
        } else {
          AlertModal({
            message:
              '신청이 완료되었습니다. 신청하신 은행에서 영업일 기준 3일 이내 확인 연락을 드릴 예정입니다.',
            type: 'alert',
          });
          deleteItem(itemId);
        }
      } catch (err) {
        console.log(err);
        AlertModal({
          message: '에러가 발생했습니다. 다시 시도해주세요.',
          type: 'alert',
        });
      } finally {
        dispatch(hideLoading());
      }
    } else {
      AlertModal({
        message:
          '최대 신청개수(10개)를 초과했습니다. \n 마이페이지에서 신청상품을 삭제하고 다시 시도해주세요.',
        type: 'alert',
      });
    }
  };

  return (
    <>
      {storage.map((item: any) => (
        <Tr key={item[0]}>
          <td>
            <Card
              bankName={item[2]}
              onClick={() =>
                navigate(
                  `/detail/${item[3] === '적금' || item[3] === '정기예금' ? 'deposit' : 'loan'}/${
                    item[0]
                  }`,
                )
              }
            >
              <div className="bank">{item[2]}</div>
              <div className="name">{item[1]}</div>
              <div className="category">{item[3]}</div>
            </Card>
          </td>
          <td>
            <div className="buttonbox">
              <button
                onClick={() => {
                  purchase(item[0]);
                  setItemId(item[0]);
                }}
              >
                신청
              </button>
              <button onClick={() => deleteItem(item[0])}>삭제</button>
            </div>
          </td>
        </Tr>
      ))}
    </>
  );
}

const Tr = styled.tr`
  width: 100%;
  vertical-align: middle;
  border-bottom: 1px solid gray;

  td {
    vertical-align: middle;
    padding: 10px 0;
  }
  .check {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }
  .buttonbox {
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
      background-color: var(--color-dark-grey);
      width: 60px;
      height: 30px;
      margin: 0 auto;
      :hover {
        background-color: var(--color-orange);
      }
    }
  }
`;

const Card = styled.div<{ bankName: string }>`
  cursor: pointer;
  width: 100%;
  height: 120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px 15px 15px 30px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: ${(props) =>
    props.bankName === '국민은행'
      ? 'var(--color-bank-yellow)'
      : props.bankName === '신한은행'
      ? 'var(--color-bank-blue)'
      : props.bankName === '하나은행'
      ? 'var(--color-bank-green)'
      : props.bankName === '우리은행'
      ? 'var(--color-bank-puple)'
      : props.bankName === '한국스탠다드차타드은행'
      ? 'var(--color-bank-sky)'
      : props.bankName === '농협은행'
      ? 'var(--color-bank-pink)'
      : props.bankName === '한국씨티은행'
      ? 'var(--color-bank-teal)'
      : props.bankName === '중소기업은행'
      ? 'var(--color-bank-orange)'
      : 'var(--color-bg-grey)'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
  .name {
    font-size: 18px;
    font-weight: bold;
  }
  .category {
    font-size: 12px;
    font-weight: bold;
    color: var(--color-dark-grey);
  }
`;

export default CartPageCard;
