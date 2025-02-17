/* eslint-disable react-hooks/exhaustive-deps */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginCashier from './pages/LoginCashier';
import LoginAdmin from './pages/LoginAdmin';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import { useDispatch, useSelector } from 'react-redux';
import axios from './axios';
import { logout, setUser } from './redux/userSlice';
import { useEffect } from 'react';
import Profile from './pages/Profile';
import Cashier from './pages/Cashier';
import Verify from './pages/Verify';
import ResetPassword from './pages/ResetPassword';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage />, errorElement: <ErrorPage /> },
  { path: '/login-admin', element: <LoginAdmin /> },
  { path: '/login-cashier', element: <LoginCashier /> },
  { path: '/home', element: <Home /> },
  { path: '/manage-category', element: <Category /> },
  { path: '/manage-product', element: <Product /> },
  { path: '/manage-cashier', element: <Cashier /> },
  { path: '/profile', element: <Profile /> },
  { path: '/verify/:token', element: <Verify /> },
  { path: '/reset-password', element: <ResetPassword /> },
]);

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const keepLogin = async () => {
    if (!token) return;

    try {
      const response = await axios.get('auth/get-user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(response.data.data));
    } catch (err) {
      console.log(err);
      dispatch(logout());
    }
  };

  useEffect(() => {
    keepLogin();
  }, [token]);

  return <RouterProvider router={router}></RouterProvider>;
}
