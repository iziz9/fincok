export const jobList = ['무직', '학생', '군인', '자영업자', '전문직', '직장인'];
export const addressList = [
  '강원도',
  '경기도',
  '경상남도',
  '경상북도',
  '광주광역시',
  '대구광역시',
  '대전광역시',
  '부산광역시',
  '서울특별시',
  '세종특별자치시',
  '울산광역시',
  '인천광역시',
  '전라남도',
  '전라북도',
  '제주특별자치도',
  '충청남도',
  '충청북도',
];
export const bankList = [
  '국민은행',
  '광주은행',
  '농협은행',
  '대구은행',
  '부산은행',
  '수협은행',
  '신한은행',
  '우리은행',
  '중소기업은행',
  '하나은행',
  '한국스탠다드차타드은행',
  '한국씨티은행',
];
export const productList = ['적금', '정기예금', '전세자금대출', '주택담보대출'];

const bgColor: Array<string> = ['#4D9FEB', '#33B155', '#D1B311', '#A985D8', '#979797', '#D06BB4'];
const tagColor: Array<string> = ['#0C216F', '#09551A', '#645508', '#601783', '#2F2F2F', '#660936'];
const colorIndex: number = Math.floor(Math.random() * bgColor.length);
export const setColor: object = { backgroundColor: bgColor[colorIndex] };
export const setDeepColor: object = { backgroundColor: tagColor[colorIndex] };
