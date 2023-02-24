import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useOutSideClick from '../../../hooks/useOutSideClick';
import styled from 'styled-components';
import { requestLogout } from '../../../api/api';
import { getCookie, removeCookie } from '../../../utils/cookie';
import { GrClose } from 'react-icons/gr';
import { BiSearch, BiLogOut } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineUser, HiOutlineClipboardList } from 'react-icons/hi';
import { RiPushpinLine } from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../../hooks/useDispatchHooks';
import { userInit } from '../../../store/userSlice';
import { userLoginInit } from '../../../store/loginSlice';
import AlertModal from '../../../utils/AlertModal';

type Props = {
  setActive: (active: boolean) => void;
};

const Navigation = ({ setActive }: Props) => {
  const naviRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);
  const token = getCookie('accessToken');

  // 모달창 닫기 hook
  useOutSideClick(naviRef, () => setActive(false));

  const closeNav = () => {
    setActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setValue(value);
  };

  const handleSubmit = (value: string) => {
    return navigate(`/search?title=${value}`);
  };

  const handleLogout = async () => {
    try {
      const res = await requestLogout();
      dispatch(userInit());
      dispatch(userLoginInit());
      closeNav;
      if (res.resultCode === 'failed') {
        AlertModal({
          message: '로그아웃이 정상적으로 처리되지 않았습니다. 다시 시도해주세요.',
          type: 'alert',
        });
      } else {
        removeCookie('accessToken');
        location.pathname = '/';
      }
    } catch (err) {
      AlertModal({
        message: '로그아웃이 정상적으로 처리되지 않았습니다. 다시 시도해주세요.',
        type: 'alert',
      });
    }
  };

  return (
    <Container>
      <Inner ref={naviRef}>
        <Close onClick={closeNav}>
          <GrClose size="22" color="var(--color-grey)" />
        </Close>
        {token ? (
          <User>
            <FaUserCircle size="50" color="var(--color-light-grey)" />
            <h2>{name}</h2>
          </User>
        ) : (
          <Login
            onClick={() => {
              navigate('/login');
              closeNav();
            }}
          >
            <FaUserCircle size="50" color="var(--color-light-grey)" />
            <h2>로그인을 해주세요</h2>
            <MdKeyboardArrowRight size="20" color="var(--color-light-grey)" />
          </Login>
        )}
        <SearchForm>
          <form
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
              aria-label="submit"
              onClick={() => {
                handleSubmit(value);
                setValue('');
                closeNav();
              }}
            >
              <BiSearch size="24" color="var(--color-light-grey)" />
            </button>
          </form>
        </SearchForm>
        <ul>
          <h2>메뉴</h2>
          <Link to={'/user'} onClick={closeNav}>
            <li>
              <HiOutlineUser color="var(--color-black)" />
              마이페이지
              <MdKeyboardArrowRight size="20" color="var(--color-light-grey)" />
            </li>
          </Link>
          <Link to={'/recommend'} onClick={closeNav}>
            <li>
              <RiPushpinLine color="var(--color-black)" />
              맞춤 추천
              <MdKeyboardArrowRight size="20" color="var(--color-light-grey)" />
            </li>
          </Link>
          <Link to={'/allproducts'} onClick={closeNav}>
            <li>
              <HiOutlineClipboardList color="var(--color-black)" />
              전체 상품
              <MdKeyboardArrowRight size="20" color="var(--color-light-grey)" />
            </li>
          </Link>
        </ul>

        {token ? (
          <Foot onClick={() => handleLogout()}>
            로그아웃
            <BiLogOut size="18" color="var(--color-white)" />
          </Foot>
        ) : (
          <Foot
            onClick={() => {
              navigate('/login');
              closeNav();
            }}
          >
            로그인
            <BiLogOut size="18" color="var(--color-white)" />
          </Foot>
        )}
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
`;

const Inner = styled.div`
  position: absolute;
  right: 0;
  width: 78%;
  height: 100vh;
  background-color: var(--color-white);
  padding: 30px 0;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  a {
    cursor: pointer;
    width: 100%;
  }
  ul {
    display: flex;
    flex-flow: column;
    margin-top: 30px;
    h2 {
      height: 60px;
      font-size: 19px;
      font-weight: bold;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 30px;
    }
    li {
      height: 60px;
      font-size: 15px;
      display: flex;
      gap: 8px;
      align-items: center;
      box-sizing: border-box;
      margin: 0 2px;
      padding: 0 30px;
      :hover {
        background-color: var(--color-bg-grey);
      }
      svg {
        :last-child {
          margin-left: auto;
        }
      }
    }
  }
`;

const Close = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 10px;
  padding: 0 25px;
  box-sizing: border-box;
  svg {
    cursor: pointer;
  }
`;

const User = styled.div`
  padding: 0 30px;
  margin: 20px 0 25px;
  display: flex;
  align-items: center;
  gap: 25px;
  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Login = styled.div`
  padding: 0 30px;
  margin: 20px 0 25px;
  display: flex;
  align-items: center;
  gap: 25px;
  cursor: pointer;
  h2 {
    font-size: 18px;
    font-weight: bold;
  }
  svg {
    :last-child {
      margin-left: auto;
    }
  }
`;

export const SearchForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 30px;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    font-size: 15px;
    padding: 10px 10px 10px 15px;
    ::placeholder {
      color: var(--color-light-grey);
    }
  }
  button {
    border: none;
    background-color: transparent;
    position: absolute;
    right: 35px;
    cursor: pointer;
    :hover {
      border-color: transparent;
      background-color: transparent;
    }
  }
`;

const Foot = styled.div`
  width: 100px;
  height: 45px;
  display: flex;
  margin: auto 25px 0 auto;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black);
  border-radius: 8px;
  font-size: 13px;
  font-weight: bold;
  color: var(--color-white);
  gap: 5px;
  cursor: pointer;
  :hover {
    background-color: var(--color-orange);
  }
`;

export default Navigation;
