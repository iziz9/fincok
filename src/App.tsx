import { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CategoryBar from './components/common/layout/CategoryBar';
import Header from './components/common/layout/Header';
import GlobalStyle from './style/globalStyles';
import { useAppDispatch } from './hooks/useDispatchHooks';
import { requestUserInfo } from './api/api';
import { userInfo } from './store/userSlice';

function App() {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getLogin = useCallback(async () => {
    const response = await requestUserInfo();
    if (response) {
      setLogin(true);
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
    getLogin();
  }, [getLogin]);

  return (
    <>
      <Header login={login} />
      <Outlet />
      <GlobalStyle />
      {location.pathname.includes('signup') ? null : <CategoryBar />}
    </>
  );
}

export default App;
