import { useDispatch } from 'react-redux'
import AdminSettings from './components/manageAdmin/adminSettings'
import ResetPasswordPage from './pages/resetPassword'
import ManagerCashier from './components/manageCashier/manageCashier'
import Required from './components/required'
import Home from './pages/home'
import WelcomePage from './pages/welcomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { setData } from './redux/userSlice'
import LoginCashier from './components/cashier/loginCashier'
import Profile from './pages/Profile'
import ManageCategory from './components/category/manageCategory'
import LoginAdmin from './components/manageAdmin/loginAdmin'
import Verify from './pages/verify'
import ManageProduct from './components/manageProduct/manageProduct'
import SalesbyDateRange from './components/salesByDateRange'
import SalesReport from './pages/SalesReport'
import ProductSales from './pages/ProductSales'
import instance from './api/axios'

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/login-admin', element: <LoginAdmin /> },
  { path: '/login-cashier', element: <LoginCashier /> },
  { path: '/verify/:token', element: <Verify /> },
  { path: '/reset-password/:token', element: <ResetPasswordPage /> },

  {
    element: <Required />,
    children: [
      //untuk yang butuh token
      { path: '/home', element: <Home /> },
      { path: '/manage-cashier', element: <ManagerCashier /> },
      { path: '/manage-product', element: <ManageProduct /> },
      { path: '/admin-settings', element: <AdminSettings /> },
      { path: '/profile', element: <Profile /> },
      { path: '/manage-category', element: <ManageCategory /> },
      { path: '/sales-report', element: <SalesReport /> },
      { path: '/sales-by-date-range', element: <SalesbyDateRange /> },
      { path: '/product-sales', element: <ProductSales /> }
    ]
  }
])

function App() {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  const keepLogin = async () => {
    try {
      const response = await instance.get('users/keep-login', {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(setData(response.data.user))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    keepLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
