import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TiHeartOutline, TiHeart } from 'react-icons/ti';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FcSalesPerformance } from 'react-icons/fc';
import { FcMoneyTransfer } from 'react-icons/fc';

const Detail = () => {
  // redux로 추후 관심상품 상태관리 변경
  const [likeState, setLikeState] = useState<boolean>(false);
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
  const heartStyle: object = {
    backgroundColor: '#fff',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    borderRadius: '20px',
    padding: '5px',
  };
  const iconStyle: object = {
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '50px',
  };

  return (
    <main>
      <ColoredSection style={setColor}>
        <div style={{ padding: '10px 0 0 10px' }}>
          <IoMdArrowRoundBack
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
        </div>
        <H1>
          <span>신한</span> <br /> <span>신한 플러스 아무튼 적금</span>
        </H1>
        <TagDiv>
          {/* 옵셔널체이닝으로 응답값에 태그 있을 경우에만 */}
          <Tag style={setDeepColor}>상품종류</Tag>
          <Tag style={setDeepColor}>지역</Tag>
          <Tag style={setDeepColor}>직종</Tag>
        </TagDiv>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ColDiv>
            <FcMoneyTransfer style={iconStyle} />
            {/* 상품별 응답값에 따라 텍스트 내용 변경 */}
            <SummaryTitle>최고우대금리</SummaryTitle>
            <SummaryContent>연 9.00%</SummaryContent>
            <SummaryTitle>(12개월 세전)</SummaryTitle>
          </ColDiv>
          <ColDiv>
            <FcSalesPerformance style={iconStyle} />
            <SummaryTitle>저축한도</SummaryTitle>
            {/* 응답값 null이면 `없음` 표시*/}
            <SummaryContent>월 30만원</SummaryContent>
          </ColDiv>
        </div>
        <Heart>
          {likeState ? (
            <TiHeart style={heartStyle} onClick={() => setLikeState(!likeState)} />
          ) : (
            <TiHeartOutline style={heartStyle} onClick={() => setLikeState(!likeState)} />
          )}
        </Heart>
      </ColoredSection>
      <FlatSection>상세설명</FlatSection>
    </main>
  );
};

const ColoredSection = styled.section`
  height: 500px;
  position: relative;
`;
const FlatSection = styled.section`
  text-align: center;
  padding-top: 30px;
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
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
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
export default Detail;
