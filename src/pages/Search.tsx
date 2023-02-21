import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SearchForm } from '../components/common/layout/Navigation';
import DepositsItem from './../components/product/DepositsItem';
import LoansItem from '../components/product/LoansItem';
import { NoList } from '../pages/Home';
import { BiSearch } from 'react-icons/bi';
//import { getDeposit, getLoan } from '../api/api';

const Search = () => {
  // const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  let infiniteScroll = false;

  const [searchTitle, setSearchTitle] = useState<string | any>('');

  const [deposits, setDeposits] = useState([]);
  const [depositsLast, setDepositsLast] = useState<boolean>(false);
  console.log(depositsLast);

  const [loans, setLoans] = useState([]);
  const [loansLast, setLoansLast] = useState<boolean>(false);
  console.log(loansLast);

  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>(null);

  // const searchList = [...deposits, ...loans];
  // console.log(searchList);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let KeywordQuery = useQuery();
  const searchText: string | any = KeywordQuery.get('title');

  useEffect(() => {
    // 네비게이션 검색시
    // if (searchText) {
    //   async function depositsData() {
    //     try {
    //       const response = await getDeposit(searchText, page);
    //       console.log('적금', response.data.content);
    //       setDeposits(response.data.content);
    //       setDepositsLast(response.data.last);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   async function loansData() {
    //     try {
    //       const response = await getLoan(searchText, page);
    //       console.log('대출', response.data.content);
    //       setLoans(response.data.content);
    //       setLoansLast(response.data.last);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   depositsData();
    //   loansData();
    //   setSearchTitle(searchText);
    // }
  }, [searchText]);

  // useEffect(() => {
  //   observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
  //   boxRef.current && observerRef.current.observe(boxRef.current);
  // }, []);

  // IntersectionObserver 설정
  // const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       // 관찰하고 있는 entry가 화면에 보여지는 경우
  //       io.unobserve(entry.target); // entry 관찰 해제
  //       setPage(+1);
  //       getSearchDeposit();
  //       getSearchLoan();
  //     }
  //   });
  // };

  // const getSearchDeposit = async () => {
  //   try {
  //     const response = await getDeposit(searchTitle, page);
  //     console.log('적금', response.data.content);
  //     setDeposits(response.data.content);
  //     setDepositsLast(response.data.last);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getSearchLoan = async () => {
  //   try {
  //     const response = await getLoan(searchTitle, page);
  //     console.log('대출', response.data.content);
  //     setLoans(response.data.content);
  //     setLoansLast(response.data.last);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setSearchTitle(value);
  };

  const handleSubmit = (value: string) => {
    return navigate(`/search?title=${value}`);
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
        {deposits.length > 0
          ? deposits.map((item, idx) => {
              return <DepositsItem item={item} key={idx} />;
            })
          : null}
        {loans.length > 0
          ? loans.map((item, idx) => {
              return <LoansItem item={item} key={idx} />;
            })
          : null}
        {deposits.length > 0 ? (
          loans.length > 0
        ) : (
          <span>
            <NoList>검색결과가 없습니다.</NoList>
          </span>
        )}
        <div ref={boxRef}></div>
      </SearchList>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px 0 120px;
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

export default Search;
