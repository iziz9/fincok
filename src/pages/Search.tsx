import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SearchForm } from '../components/common/layout/Navigation';
import SearchItem from '../components/product/SearchItem';
import { NoList } from '../pages/Home';
import { BiSearch } from 'react-icons/bi';
import { getDeposit, getLoan } from '../api/api';
import { useInView } from 'react-intersection-observer';
import { getCookie } from '../utils/cookie';
import AlertLoginState from '../components/common/AlertLoginState';

const Search = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [searchTitle, setSearchTitle] = useState<string | any>('');
  const [page, setPage] = useState<number>(1);

  // 적금/대출 검색 리스트
  const [deposits, setDeposits] = useState([]);
  const [depositsLast, setDepositsLast] = useState<boolean>(false);
  const [loans, setLoans] = useState([]);
  const [loansLast, setLoansLast] = useState<boolean>(false);

  // 전체 검색 리스트
  const searchList = [...deposits, ...loans];

  // 상품별 조회 탭
  const [active, setActive] = useState([false, false]);
  const [onProduct, setOnProduct] = useState(0);

  // 쿼리스트링
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let KeywordQuery = useQuery();
  const searchText: string | any = KeywordQuery.get('title');

  // 적금/예금 조회
  const getSearchDeposit = useCallback(
    async (setDeposits: any, setDepositsLast: any) => {
      try {
        const response = await getDeposit(searchText, page);
        setDeposits((prevState: any) => [...prevState, ...response.content]);
        setDepositsLast(response.last);
      } catch (error) {
        console.log(error);
      }
    },
    [searchText, page],
  );

  // 대출 조회
  const getSearchLoan = useCallback(
    async (setLoans: any, setLoansLast: any) => {
      try {
        const response = await getLoan(searchText, page);
        setLoans((prevState: any) => [...prevState, ...response.content]);
        setLoansLast(response.last);
      } catch (error) {
        console.log(error);
      }
    },
    [searchText, page],
  );

  useEffect(() => {
    // 네비게이션 쿼리 유무
    if (searchText) {
      // 초기화
      setPage(1);
      setDeposits([]);
      setLoans([]);
      setSearchTitle(searchText);
    }
  }, [searchText]);

  // api 호출 함수가 바뀔 때 마다 실행
  useEffect(() => {
    getSearchDeposit(setDeposits, setDepositsLast);
    getSearchLoan(setLoans, setLoansLast);
  }, [getSearchDeposit, getSearchLoan, onProduct]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 마지막 페이지 일 때
    if ((inView && depositsLast === false) || (inView && loansLast === false)) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setSearchTitle(value);
  };

  const handleSubmit = (value: string) => {
    return navigate(`/search?title=${value}`);
  };

  const handleDeposits = () => {
    setActive([true, false]);
    setOnProduct(1);
  };

  const handleLoans = () => {
    setActive([false, true]);
    setOnProduct(2);
  };

  return (
    <Container>
      <SearchForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={searchTitle}
            placeholder="검색어를 입력해 주세요"
            onChange={(e) => handleChange(e)}
          />
          <button
            aria-label="submit"
            onClick={() => {
              handleSubmit(searchTitle);
            }}
          >
            <BiSearch size="24" color="var(--color-light-grey)" />
          </button>
        </form>
      </SearchForm>
      <SearchList>
        <ProductTap>
          <button className={active[0] ? 'active' : ''} onClick={handleDeposits}>
            적금 / 예금 상품
          </button>
          <button className={active[1] ? 'active' : ''} onClick={handleLoans}>
            대출 상품
          </button>
        </ProductTap>
        {onProduct === 1 ? (
          deposits.length > 0 ? (
            deposits.map((item: any, idx) => {
              return <SearchItem item={item} key={idx} />;
            })
          ) : (
            <span>
              <NoList>검색결과가 없습니다.</NoList>
            </span>
          )
        ) : onProduct === 2 ? (
          loans.length > 0 ? (
            loans.map((item: any, idx) => {
              return <SearchItem item={item} key={idx} />;
            })
          ) : (
            <span>
              <NoList>검색결과가 없습니다.</NoList>
            </span>
          )
        ) : searchList.length > 0 ? (
          searchList.map((item: any, idx) => {
            return <SearchItem item={item} key={idx} />;
          })
        ) : (
          <span>
            <NoList>검색결과가 없습니다.</NoList>
          </span>
        )}
      </SearchList>
      <div ref={ref}></div>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px 0;
  form {
    padding: 0 35px;
    button {
      right: 40px;
    }
  }
`;

const SearchList = styled.div`
  padding: 30px 35px;
  display: flex;
  flex-flow: column;
  gap: 20px;
  span {
    margin-top: 40px;
  }
`;

const ProductTap = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  button {
    color: var(--color-black);
    padding: 0 1.5em;
    background-color: var(--color-bg-grey);
    font-weight: bold;
    &.active {
      background-color: var(--color-black);
      color: var(--color-white);
    }
  }
`;

export default Search;
