import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Cart from './pages/Cart';
import Detail from './pages/Detail';
import Home from './pages/Home';
import MyPage from './pages/user/MyPage';
import Search from './pages/Search';
import Recommend from './pages/Recommend';
import AllProducts from './pages/AllProducts';
import FindPassword from './pages/Auth/FindPassword';
import NotFound from './pages/NotFound';
import AllProductList from './components/allProducts/AllProductList';
import Wish from './pages/Wish';
import UserInfo from './pages/user/UserInfo';
import Purchase from './pages/Purchase';

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
        path: 'detail/:category/:productId',
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
        path: 'allproducts/depositlist',
        element: <AllProductList />,
      },
      {
        path: 'allproducts/savinglist',
        element: <AllProductList />,
      },
      {
        path: 'allproducts/mortgageloan',
        element: <AllProductList />,
      },
      {
        path: 'allproducts/charterloan',
        element: <AllProductList />,
      },
      {
        path: 'wish',
        element: <Wish />,
      },
      {
        path: 'user/info',
        element: <UserInfo />,
      },
      {
        path: 'purchase',
        element: <Purchase />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
