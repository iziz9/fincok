import React, { useState } from 'react';
import LoanWishList from '../components/wish/LoanWishList';
import styled from 'styled-components';
import DepositWishList from '../components/wish/DepositWishList';

function Wish() {
  const [depositWishData, setDepositWishData] = useState();
  const [loanWishData, setLoanWishData] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [toggleButton, setToggleButton] = useState<boolean>(true);

  const ButtonToggle = () => {
    setToggleButton(!toggleButton);
  };
  return (
    <div>
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
    </div>
  );
}

const Container = styled.div``;

const Button = styled.button<{ toggleButton: boolean }>`
  background-color: ${(props) => (props.toggleButton ? 'var(--color-orange)' : 'var(--color-black)')};
  border-color: ${(props) => (props.toggleButton ? 'var(--color-orange)' : 'var(--color-black)')};
`;

export default Wish;
