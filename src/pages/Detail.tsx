import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BsHouseFill,
  BsArrowLeft,
  BsSuitHeart,
  BsSuitHeartFill,
  BsBagPlus,
  BsCart4,
} from 'react-icons/bs';
import { FcSalesPerformance } from 'react-icons/fc';
import { FcMoneyTransfer } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { getProductDetail, requestSetWishList, requestDelWishList } from '../api/api';
import NotFound from './NotFound';

export interface ProductType {
  bank: string;
  category: string;
  itemId: number;
  itemName: string;
  join: string;
  limit: number | null;
  mature?: string;
  prefRate?: number;
  preferences: string | null;
  rate?: number;
  target: string | null;
  type: string;
  delay?: string | null;
  maxRate?: number;
  minRate?: number;
}

const Detail = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<ProductType>();
  // redux로 추후 관심상품 상태관리 변경
  const [likeState, setLikeState] = useState<boolean>(false);
  const [cartState, setCartState] = useState<boolean>(false);

  //navigate로 들어올 때 category, item 전달해서 함수실행
  useEffect(() => {
    async function getData() {
      const data = await getProductDetail('loan', '62');
      setInfo(data);
    }
    getData();
  }, []);

  const bgColor: Array<string> = ['#4D9FEB', '#33B155', '#D1B311', '#A985D8', '#979797', '#D06BB4'];
  const tagColor: Array<string> = [
    '#0C216F',
    '#09551A',
    '#645508',
    '#601783',
    '#2F2F2F',
    '#660936',
  ];
  const colorIndex: number = Math.floor(Math.random() * bgColor.length);
  const setColor: object = { backgroundColor: bgColor[colorIndex] };
  const setDeepColor: object = { backgroundColor: tagColor[colorIndex] };

  const [colorState, setColorState] = useState<object>(setColor);
  const [deepColorState, setDeepColorState] = useState<object>(setDeepColor);
  useEffect(() => {
    setColorState(setColor);
    setDeepColorState(setDeepColor);
  }, []);

  const heartStyle: object = {
    backgroundColor: '#fff',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    borderRadius: '25px',
    padding: '13px',
  };
  const cartStyle: object = {
    backgroundColor: '#fff',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    borderRadius: '25px',
    padding: '13px',
    color: 'black',
  };
  const iconStyle: object = {
    width: '45px',
    height: '45px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '50px',
  };

  const matureText = info?.mature?.split('%');
  const delayText = info?.delay?.split('%');

  const addCartHandler = () => {
    setCartState(!cartState);
    if (localStorage.getItem('cart')) {
      alert('이미 담긴 상품입니다. 장바구니를 확인해주세요.');
    } else {
      localStorage.setItem('cart', JSON.stringify(info));
      window.confirm('장바구니에 상품이 담겼습니다');
      const local = localStorage.getItem('cart');
      console.log(local);
      //confirm대신 모달 만들어서 띄우기(장바구니로 이동 / 취소버튼)
    }
  };
  const addwishHandler = (itemId: number) => {
    const formData = new FormData();
    formData.append('itemId', `${itemId}`);
    requestSetWishList(formData, setLikeState);
  };

  return (
    <main>
      {info ? (
        <>
          <ColoredSection style={colorState}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
              <BsArrowLeft
                onClick={() => history.back()}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  width: '15px',
                  height: '15px',
                  padding: '10px',
                  borderRadius: '100%',
                }}
              />
              <BsHouseFill
                onClick={() => navigate('/')}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  width: '15px',
                  height: '15px',
                  padding: '10px',
                  borderRadius: '100%',
                }}
              />
            </div>
            <H1>
              <span>{info.bank}</span> <br /> <span>{info.itemName}</span>
            </H1>
            <TagDiv>
              <Tag style={deepColorState}>{info.category}</Tag>
              {info.target ? <Tag style={deepColorState}>{info.target}</Tag> : null}
              {info.type ? <Tag style={deepColorState}>{info.type}</Tag> : null}
            </TagDiv>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <ColDiv>
                <FcMoneyTransfer style={iconStyle} />
                {info?.category === '정기예금' || info.category === '적금' ? (
                  <>
                    <SummaryTitle>최고우대금리</SummaryTitle>
                    <SummaryContent>연 {info.prefRate}%</SummaryContent>
                    <SummaryTitle>(12개월 세전)</SummaryTitle>
                  </>
                ) : (
                  <>
                    <SummaryTitle>최저대출금리</SummaryTitle>
                    <SummaryContent>연 {info.minRate}%</SummaryContent>
                  </>
                )}
              </ColDiv>
              <ColDiv>
                <FcSalesPerformance style={iconStyle} />
                <SummaryTitle>
                  {info?.category === '정기예금' || info.category === '적금'
                    ? '저축한도'
                    : '최고대출금리'}
                </SummaryTitle>
                {info.maxRate && <SummaryContent>연 {info.maxRate}%</SummaryContent>}
                {(info?.category === '정기예금' || info.category === '적금') && (
                  <SummaryContent>
                    {info.limit ? '월 ' + info.limit + ' 만원' : '없음'}
                  </SummaryContent>
                )}
              </ColDiv>
            </div>
            <Heart>
              {likeState ? (
                <BsSuitHeartFill
                  style={heartStyle}
                  onClick={() => {
                    requestDelWishList(info.itemId, setLikeState);
                  }}
                />
              ) : (
                <BsSuitHeart
                  style={heartStyle}
                  onClick={() => {
                    addwishHandler(info.itemId);
                  }}
                />
              )}
              <BsCart4 style={cartStyle} onClick={() => addCartHandler()} />
            </Heart>
          </ColoredSection>
          <FlatSection>
            <ProductDetailTitle>
              {info.target
                ? `${info.target}을 위한 ${info.category}상품`
                : `${info.bank} ${info.category}상품`}
            </ProductDetailTitle>
            <span style={{ color: '#131519', fontSize: '16px', fontWeight: 600 }}>
              '{info.join}'을 통해 가입할 수 있습니다.
            </span>
            {info.mature && (
              <ProductDesc>
                <div style={{ color: 'orange', fontSize: '18px', marginBottom: '10px' }}>
                  만기 후 이자율은?
                </div>
                {matureText?.map((text, index) => (
                  <div key={index}>
                    {index !== matureText.length - 1 ? <span>{text}%</span> : <span>{text}</span>}
                  </div>
                ))}
              </ProductDesc>
            )}
            {info.delay && (
              <ProductDesc>
                <div style={{ color: 'orange', fontSize: '18px', marginBottom: '10px' }}>
                  연체 이자율은?
                </div>
                {delayText?.map((delay, index) => (
                  <div key={index}>
                    {index !== delayText.length - 1 ? <div>{delay}%</div> : <span>{delay}</span>}
                  </div>
                ))}
              </ProductDesc>
            )}
          </FlatSection>
        </>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

const ColoredSection = styled.section`
  height: 500px;
  position: relative;
`;
const FlatSection = styled.section`
  padding: 50px 35px;
`;
const H1 = styled.h1`
  font-size: 30px;
  margin-top: 0;
  padding-bottom: 30px;
  text-align: center;
  color: #fff;
  line-height: 40px;
`;
const TagDiv = styled.div`
  height: 60px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Tag = styled.div`
  width: 110px;
  height: 30px;
  line-height: 30px;
  color: #ececec;
  font-size: 15px;
  font-weight: 500;
  border-radius: 50px;
  text-align: center;
`;
const Heart = styled.div`
  width: 150px;
  height: 80px;
  display: flex;
  gap: 20px;
  // flex-direction: column;
  position: absolute;
  right: 0;
  bottom: 0;
  color: #f74440;
`;
const ColDiv = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;
const SummaryTitle = styled.span`
  color: #e5e5e5;
  margin-top: 10px;
`;
const SummaryContent = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;
const ProductDetailTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #2c6880;
  margin-bottom: 20px;
`;
const ProductDesc = styled.div`
  font-size: 15px;
  line-height: 22px;
  margin-top: 28px;
  padding-bottom: 60px;
  color: #5b5e63;
  font-weight: 600;
`;
export default Detail;
