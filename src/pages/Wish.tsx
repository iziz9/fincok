import React, { useState } from 'react';
import LoanWishList from '../components/wish/LoanWishList';
import styled from 'styled-components';
import DepositWishList from '../components/wish/DepositWishList';

function Wish() {
  const [toggleButton, setToggleButton] = useState<boolean>(true);

  const ButtonToggle = () => {
    setToggleButton(!toggleButton);
  };
  return (
    <Wrap>
      <Title>관심 상품</Title>
      <div>
        <FlexBox>
        <Button
          onClick={ButtonToggle}
          toggleButton={toggleButton}
        >
          예/적금 관심상품
        </Button>
        <Button
          onClick={ButtonToggle}
          toggleButton={!toggleButton}
        >
          대출 관심상품
        </Button>
        </FlexBox>
        {
          toggleButton ? <DepositWishList /> : <LoanWishList /> 
        }
      </div>
    </Wrap>
  );
}

const Title = styled.h2`
  margin-top: 40px;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: bold;
`
const FlexBox = styled.div`
  display: flex;
  gap: 5px;
  width: max-content;
  background-color: var(--color-dark-grey);
  border-radius: 8px;
`;

const Button = styled.button<{ toggleButton: boolean }>`
  background-color: ${(props) => (props.toggleButton ? 'var(--color-orange)' : 'var(--color-dark-grey)')};
  border-color: none;
  /* border-radius: ${(props) => (props.toggleButton ? '8px' : '0px')}; */
  border-style: none;
  width: 120px;
  transition: all .3s;
`;
const Wrap = styled.div`
  padding: 0 30px;
`
export default Wish;
