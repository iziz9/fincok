import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CategoryBar from './components/common/layout/CategoryBar';
import Header from './components/common/layout/Header';
import GlobalStyle from './style/globalStyles';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  return (
    <>
      {/* <Reset /> */}
      <Header />
      <Outlet />
      <GlobalStyle />
      {location.pathname.includes('signup') ? null : <CategoryBar />}
    </>
  );
}

export default App;
