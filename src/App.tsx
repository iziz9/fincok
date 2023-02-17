import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CategoryBar from './components/common/CategoryBar';
import Header from './components/common/layout/Header';
import GlobalStyle from './style/globalStyles';
import { useLocation } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  return (
    <>
      {/* <Reset /> */}
      <Header />
      <Outlet />
      <GlobalStyle />
      {location.pathname.includes('auth') ? null : <CategoryBar />}
    </>
  );
}

export default App;
