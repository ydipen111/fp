
import { createBrowserRouter } from 'react-router'
import './App.css'
import { RootLayout } from './ui/RootLayout'
import { RouterProvider } from 'react-router/dom'
import { Home } from './Home'
import Login from './features/auth/Login'
import SignUp from './features/auth/SignUp'
import { UserRoutes } from './ui/UserRoutes'
import ProductAdmin from './features/admin/ProductAdmin'

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    children: [{
      index: true,
      element: <Home />
    },
    {
      path: 'products-admin',
      element: <ProductAdmin />

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
