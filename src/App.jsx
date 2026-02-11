/* eslint-disable react-hooks/exhaustive-deps */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Cashier from './pages/Cashier';
import Verify from './pages/Verify';
import ResetPassword from './pages/ResetPassword';
import ErrorPage from './pages/ErrorPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage />, errorElement: <ErrorPage /> },
  { path: '/login', element: <Login /> },
  { path: '/verify/:token', element: <Verify /> },
  { path: '/reset-password', element: <ResetPassword /> },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/manage-category',
    element: (
      <ProtectedRoute>
        <Category />
      </ProtectedRoute>
    ),
  },
  {
    path: '/manage-product',
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: '/manage-cashier',
    element: (
      <ProtectedRoute>
        <Cashier />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
