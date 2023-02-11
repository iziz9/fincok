import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Cart from './pages/Cart';
import Detail from './pages/Detail';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'detail/:productId',
        element: <Detail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'auth/signin',
        element: <SignIn />,
      },
      {
        path: 'auth/signup',
        element: <SignUp />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
