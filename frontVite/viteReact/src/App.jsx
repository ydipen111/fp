
import { createBrowserRouter } from 'react-router'
import './App.css'
import { RootLayout } from './ui/RootLayout'
import { RouterProvider } from 'react-router/dom'
import { Home } from './Home'
import Login from './features/auth/Login'
import SignUp from './features/auth/SignUp'
import { UserRoutes } from './ui/UserRoutes'
import ProductAdmin from './features/admin/ProductAdmin'
import { Products } from './features/product/Products'
import ProductDetail from './features/product/ProductDetail'
import CartPage from './features/cart/CartPage'


function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    children: [{
      index: true,
      element: <Products />
    },
    {
      path: 'products-admin',
      element: <ProductAdmin />

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
