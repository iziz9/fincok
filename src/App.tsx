import { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CategoryBar from './components/common/layout/CategoryBar';
import Header from './components/common/layout/Header';
import GlobalStyle from './style/globalStyles';
import { getCookie } from './utils/cookie';
import { useAppDispatch } from './hooks/useDispatchHooks';
import { requestUserInfo } from './api/api';
import { userInfo } from './store/userSlice';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = getCookie('accessToken');

  const getLogin = useCallback(async () => {
    const response = await requestUserInfo();
    if (response) {
      dispatch(
        userInfo({
          memberId: response.memberId,
          name: response.name,
          birth: response.birth,
          category: response.category,
          bank: response.bank,
        }),
      );
    }
  }, [location]);

  useEffect(() => {
    if (token) {
      getLogin();
    }
  }, [getLogin]);

  return (
    <>
      <Header />
      <Outlet />
      <GlobalStyle />
      {location.pathname.includes('signup') ? null : <CategoryBar />}
    </>
  );
}

export default App;
