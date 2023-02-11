import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Reset } from 'styled-reset';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Reset />
      <Outlet />
    </>
  );
}

export default App;
