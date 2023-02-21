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
      <h2>관심 상품</h2>
      <Container>
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
        {
          toggleButton ? <DepositWishList /> : <LoanWishList /> 
        }
      </Container>
    </Wrap>
  );
}

const Container = styled.div``;

const Button = styled.button<{ toggleButton: boolean }>`
  background-color: ${(props) => (props.toggleButton ? 'var(--color-orange)' : 'var(--color-black)')};
  border-color: ${(props) => (props.toggleButton ? 'var(--color-orange)' : 'var(--color-black)')};
`;
const Wrap = styled.div`
  padding: 0 30px;
`
export default Wish;
