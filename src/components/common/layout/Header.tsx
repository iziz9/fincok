import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Navigation';
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';

const Header = () => {
  const [active, setActive] = useState<boolean>(false);

  const navigation = () => {
    setActive(true);
  };
  return (
    <Container>
      <Inner>
        <Logo>
          <Link to={'/'}>
            <img src="./logo_fincok.png" alt="로고" />
          </Link>
        </Logo>
        <Icon>
          <Cart>
            <Link to={'/'}>
              <AiOutlineShoppingCart size="28" color="var(--color-black)" />
            </Link>
          </Cart>
          <Menu onClick={navigation}>
            <AiOutlineMenu size="28" color="var(--color-black)" />
          </Menu>
        </Icon>
      </Inner>
      {active && <Navigation setActive={setActive} />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #fff;
  box-sizing: border-box;
`;

const Inner = styled.div`
  width: 100%;
  padding: 20px 35px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  box-sizing: border-box;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 100px;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const Cart = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  cursor: pointer;
`;

export default Header;
