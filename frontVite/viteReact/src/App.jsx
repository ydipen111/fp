
import { createBrowserRouter } from 'react-router'
import './App.css'
import { RootLayout } from './ui/RootLayout'
import { RouterProvider } from 'react-router/dom'
import Login from './features/auth/Login'
import SignUp from './features/auth/SignUp'
import { UserRoutes } from './ui/UserRoutes'
import ProductAdmin from './features/admin/ProductAdmin'
import { Products } from './features/product/Products'
import ProductDetail from './features/product/ProductDetail'
import CartPage from './features/cart/CartPage'
import { UserProfie } from './features/profile/UserProfie'
import OrderDetail from './features/order/OrderDetail'
import { SearchPage } from './features/search/SearchPage'
import { BodyPage } from './BodyPage'



function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    children: [{
      index: true,
      element: <BodyPage />
    },

    {
      path: 'products-admin',
      element: <ProductAdmin />

    },
    {
      path: 'bodyPage',
      element: <BodyPage />

    },
    {
      path: 'products-details/:id',
      element: <ProductDetail />

    },
    {
      path: 'cart-page',
      element: <CartPage />
    },
    {
      path: 'user-profile',
      element: <UserProfie />

    },
    {
      path: 'order-details/:id',
      element: <OrderDetail />

    },
    {
      path: 'search/:search',
      element: <SearchPage />
    },
    {
      element: <UserRoutes />,
      children: [
        {
          path: 'login-page',
          element: <Login />
        },
        {
          path: 'signup-page',
          element: <SignUp />
        }


      ]

    },

    ]
  }])


  return <RouterProvider router={router} />
}

export default App
