import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TiHeartOutline, TiHeart, TiHome, TiArrowLeftThick } from 'react-icons/ti';
import { FcSalesPerformance } from 'react-icons/fc';
import { FcMoneyTransfer } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { BsCartPlus, BsCartX } from 'react-icons/bs';

const Detail = () => {
  const navigate = useNavigate();
  // redux로 추후 관심상품 상태관리 변경
  const [likeState, setLikeState] = useState<boolean>(false);
  const [cartState, setCartState] = useState<boolean>(false);

  // 컬러차트도 헤더에 똑같이 적용하기
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
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    borderRadius: '20px',
    padding: '5px',
  };
  const cartStyle: object = {
    backgroundColor: '#fff',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    borderRadius: '25px',
    padding: '10px',
  };
  const iconStyle: object = {
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '50px',
  };

  // const { }= getProductDetail() //navigate에서?

  return (
    <main>
      <ColoredSection style={colorState}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
          <TiArrowLeftThick
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
          <TiHome
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
          <span>{'props.bank'}</span> <br /> <span>{'props.itemName'}</span>
        </H1>
        <TagDiv>
          {/* 옵셔널체이닝으로 응답값에 태그 있을 경우에만 */}
          <Tag style={deepColorState}>{'props.category'}</Tag>
          <Tag style={deepColorState}>{'props.target'}</Tag>
          <Tag style={deepColorState}>{'props.type'}</Tag>
        </TagDiv>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ColDiv>
            <FcMoneyTransfer style={iconStyle} />
            {/* 상품 카테고리에 따라 텍스트 내용 변경 */}
            <SummaryTitle>최고우대금리/최저대출금리</SummaryTitle>
            <SummaryContent>연 {'prefRate / minRate'} %</SummaryContent>
            <SummaryTitle>(12개월 세전)</SummaryTitle>
          </ColDiv>
          <ColDiv>
            <FcSalesPerformance style={iconStyle} />
            {/* 상품 카테고리에 따라 텍스트 내용 변경 */}
            <SummaryTitle>(저축?)한도</SummaryTitle>
            {/* 응답값 null이면 `없음` 표시*/}
            <SummaryContent>월 {'props.limit'} 30만원</SummaryContent>
          </ColDiv>
        </div>
        <Heart>
          {likeState ? (
            <TiHeart style={heartStyle} onClick={() => setLikeState(!likeState)} />
          ) : (
            <TiHeartOutline style={heartStyle} onClick={() => setLikeState(!likeState)} />
          )}
          {cartState ? (
            <BsCartX style={cartStyle} onClick={() => setCartState(!cartState)} />
          ) : (
            <BsCartPlus style={cartStyle} onClick={() => setCartState(!cartState)} />
          )}
        </Heart>
      </ColoredSection>
      <FlatSection>
        <ProductDetailTitle>
          {/* target: null이 아니면 `~을 위한` */}
          직장인을 위한 신한은행 정기적금
        </ProductDetailTitle>
        <span style={{ color: '#131519', fontSize: '16px', fontWeight: 600 }}>
          {'props.join'} 을 통해 가입할 수 있습니다.
        </span>
        <ProductDesc>
          만기 후 이자율은? <br />
          -1개월 이하:(일반) 정기예금 기본금리 1/2 -1개월 초과~6개월 이하: (일반) 정기예금
          기본금리의 1/4 -6개월 초과 0.2% -1개월 이하:(일반) 정기예금 기본금리 1/2 -1개월 초과~6개월
          이하: (일반) 정기예금 기본금리의 1/4 -6개월 초과 0.2% -1개월 이하:(일반) 정기예금 기본금리
          1/2 -1개월 초과~6개월 이하: (일반) 정기예금 기본금리의 1/4 -6개월 초과 0.2%
        </ProductDesc>
      </FlatSection>
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
  magin: 20px 0;
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
  width: 140px;
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
