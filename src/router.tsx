import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Cart from './pages/Cart';
import Detail from './pages/Detail';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Search from './pages/Search';
import Recommend from './pages/Recommend';
import AllProducts from './pages/AllProducts';
import FindPassword from './pages/Auth/FindPassword';
import NotFound from './pages/NotFound';

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
        path: 'login',
        element: <Login />,
      },
      {
        path: 'findpassword',
        element: <FindPassword />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'user',
        element: <MyPage />,
      },
      {
        path: 'recommend',
        element: <Recommend />,
      },
      {
        path: 'allproducts',
        element: <AllProducts />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
