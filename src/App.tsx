import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Reset } from 'styled-reset';
import CategoryBar from './components/CategoryBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Reset />
      <Outlet />
      <CategoryBar/>
    </>
  );
}

export default App;
