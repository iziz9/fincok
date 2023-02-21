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
import AllProducts from './pages/allProducts/AllProducts';
import FindPassword from './pages/Auth/FindPassword';
import NotFound from './pages/NotFound';
import DepositList from './pages/allProducts/DepositList';
import SavingsList from './pages/allProducts/SavingsList';
import MortgageLoan from './pages/allProducts/MortgageLoan';
import CharterLoan from './pages/allProducts/CharterLoan';


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
      {
        path: 'allproducts/depositlist',
        element: <DepositList />,
      },
      {
        path: 'allproducts/savinglist',
        element: <SavingsList />,
      },
      {
        path: 'allproducts/mortgageloan',
        element: <MortgageLoan />,
      },
      {
        path: 'allproducts/charterloan',
        element: <CharterLoan />,
      },
    ],
  },
]);

export default router;
