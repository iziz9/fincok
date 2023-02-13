import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyle from './style/globalStyles';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
