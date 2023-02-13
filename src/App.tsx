import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Reset } from 'styled-reset';
import CategoryBar from './components/CategoryBar';
import { useLocation } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  return (
    <>
      <Reset />
      <Outlet />
      { location.pathname.includes('auth') ? null : <CategoryBar/>}
    </>
  );
}

export default App;
