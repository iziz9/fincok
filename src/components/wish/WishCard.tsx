import { HiHeart } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = { item: DataType; wishClick: Function };

function WishCard({ item, wishClick }: Props) {
  const navigate = useNavigate();

  return (
    <Wrap>
      <LinkWrap
        onClick={() =>
          navigate(
            `/detail/${
              item.category === '적금' || item.category === '정기예금' ? 'deposit' : 'loan'
            }/${item.itemId}`,
          )
        }
      >
        <Item bankName={item.bank}>
          <div>
            <h4>{item.bank}</h4>
          </div>
          <h3>{item.itemName}</h3>
          <span>
            {item.category} - {item.type}
          </span>
        </Item>
      </LinkWrap>
      <Button
        onClick={() => {
          wishClick(item.itemId);
        }}
      >
        <HiHeart size={30} color={'var(--color-dark-grey)'} />
      </Button>
    </Wrap>
  );
}
const Wrap = styled.div`
  position: relative;
`;
const LinkWrap = styled.div`
  cursor: pointer;
  width: 100%;
`;
const Button = styled.button`
  position: absolute;
  top: 24px;
  right: 23px;
  height: max-content;
  background-color: transparent;
  :hover {
    background-color: transparent;
  }
  svg {
    :hover {
      fill: var(--color-orange);
    }
  }
`;
const Item = styled.div<{ bankName: string }>`
  padding: 30px;
  height: 100px;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  color: rgba(0, 0, 0, 0.7);
  margin: 20px auto;
  background-color: ${(props) =>
    props.bankName === '국민은행'
      ? 'var(--color-bank-yellow)'
      : props.bankName === '신한은행'
      ? 'var(--color-bank-sky)'
      : props.bankName === '하나은행'
      ? 'var(--color-bank-green)'
      : props.bankName === '우리은행'
      ? 'var(--color-bank-puple)'
      : props.bankName === '한국스탠다드차타드은행'
      ? 'var(--color-bank-lightgreen)'
      : props.bankName === '농협은행'
      ? 'var(--color-bank-blue)'
      : props.bankName === '한국씨티은행'
      ? 'var(--color-bank-teal)'
      : props.bankName === '중소기업은행'
      ? 'var(--color-bank-orange)'
      : 'var(--color-bg-grey)'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
  div {
    display: flex;
    align-items: center;
    h4 {
      font-size: 18px;
      margin: 0 auto 0 0;
    }
    p {
      font-size: 12px;
      font-weight: bold;
      background-color: white;
      padding: 5px 10px;
      border-radius: 30px;
      color: var(--color-black);
    }
  }
  h3 {
    margin: 13px 0 0;
    font-size: 20px;
    line-height: 1.2em;
    font-weight: bold;
  }
  span {
    font-weight: bold;
    margin-top: auto;
  }
`;

export type DataType = {
  itemId: string;
  category: string;
  bank: string;
  itemName: string;
  type: string;
  join: string;
  limit: string;
  preference: any;
  target: any;
  rate: string;
  prefRate: string;
  mature: string;
};

export default WishCard;
