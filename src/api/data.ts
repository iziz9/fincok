interface resultData {
  itemId: number;
  category: string;
  bank: string;
  itemName: string;
  type: string;
  dtype: string;
  rate: number;
  prefRate: number;
}

const resultData = [
  {
    itemId: 1,
    category: '정기예금',
    bank: '우리은행',
    itemName: '우리웰리치 주거래예금',
    type: '단리',
    dtype: 'D',
    rate: 3.3,
    prefRate: 3.5,
  },
  {
    itemId: 2,
    category: '정기예금',
    bank: '국민은행',
    itemName: '우리웰리치100예금(회전형)',
    type: '단리',
    dtype: 'D',
    rate: 3.25,
    prefRate: 3.45,
  },
  {
    itemId: 3,
    category: '정기예금',
    bank: '하나은행',
    itemName: 'Red Monkey 스마트 정기예금',
    type: '단리',
    dtype: 'D',
    rate: 2.8,
    prefRate: 2.8,
  },
  {
    itemId: 4,
    category: '정기예금',
    bank: '우리은행',
    itemName: '우리로모아 정기예금',
    type: '단리',
    dtype: 'D',
    rate: 3.3,
    prefRate: 3.5,
  },
  {
    itemId: 5,
    category: '정기예금',
    bank: '우리은행',
    itemName: '우리예금',
    type: '단리',
    dtype: 'D',
    rate: 3.75,
    prefRate: 3.75,
  },
];

export default resultData;
