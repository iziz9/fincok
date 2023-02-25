import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Navigation';
import { BiSearch } from 'react-icons/bi';
import { CgMenu } from 'react-icons/cg';

const Header = () => {
  const [active, setActive] = useState<boolean>(false);
  const [searchOn, setSearchOn] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = () => {
    setActive(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setValue(value);
  };

  const handleSubmit = (value: string) => {
    return navigate(`/search?title=${value}`);
  };

  useEffect(() => {
    setSearchOn(false);
  }, [location]);

  return (
    <Container>
      <Inner>
        <Logo>
          <Link to={'/'}>
            <img src="/logo_fincok.png" alt="로고" />
          </Link>
        </Logo>
        <Icon>
          <form
            className={searchOn ? 'on' : ''}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              value={value}
              placeholder="검색어를 입력해 주세요"
              onChange={(e) => handleChange(e)}
            />
            <button
              className={searchOn ? 'buttonOn' : ''}
              aria-label="submit"
              onClick={() => {
                handleSubmit(value);
                setValue('');
                setSearchOn(false);
              }}
            >
              <BiSearch size="22" color="var(--color-black)" />
            </button>
          </form>
          <ToggleSearch
            className={searchOn ? 'toggle search' : 'search'}
            onClick={() => {
              setSearchOn((e) => !e);
            }}
          />
          <Menu onClick={navigation}>
            <CgMenu size="28" color="var(--color-black)" />
          </Menu>
        </Icon>
      </Inner>
      {active && <Navigation setActive={setActive} />}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  max-width: 500px;
  top: 0;
  height: 75px;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 100;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
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
  gap: 10px;
  form {
    position: relative;
    width: 0;
    height: 35px;
    overflow: hidden;
    right: -7px;
    transition: all 1s;
    &.on {
      width: 230px;
    }
    button {
      background-color: transparent;
      position: absolute;
      top: 0;
      right: 3px;
      height: 35px;
      opacity: 0;
      transition: all 1s;
      &.buttonOn {
        opacity: 1;
      }
    }
    input {
      width: 100%;
      height: 35px;
      box-sizing: border-box;
      border: 1px solid var(--color-grey);
      padding-left: 10px;
    }
  }
`;

const ToggleSearch = styled.div`
  &.search {
    width: 35px;
    height: 35px;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    position: relative;
  }
  &::before {
    content: '';
    position: absolute;
    margin: auto;
    top: 12px;
    right: 0;
    bottom: 0;
    left: 13px;
    width: 10px;
    height: 2.2px;
    background: var(--color-black);
    transform: rotate(45deg);
    transition: all 0.5s;
  }
  &::after {
    content: '';
    position: absolute;
    margin: auto;
    top: -5px;
    right: 0;
    bottom: 0;
    left: -5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2.5px solid var(--color-black);
    transition: all 0.5s;
  }
  &.toggle {
    &::before {
      content: '';
      position: absolute;
      margin: auto;
      top: 0px;
      right: 0;
      bottom: 0;
      left: 0;
      width: 20px;
      height: 2.5px;
      background: var(--color-black);
      transform: rotate(45deg);
      transition: all 0.5s;
    }
    &::after {
      content: '';
      position: absolute;
      margin: auto;
      top: 0px;
      right: 0;
      bottom: 0;
      left: 0;
      width: 20px;
      height: 2.5px;
      background: var(--color-black);
      border: none;
      border-radius: 0;
      transform: rotate(-45deg);
      transition: all 0.5s;
    }
  }
`;

const Menu = styled.div`
  cursor: pointer;
`;

export default Header;
