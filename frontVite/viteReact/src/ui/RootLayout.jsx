import { Button } from '@material-tailwind/react'
import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router'
import { Footer } from './Footer'

export const RootLayout = () => {
  return (
    <div className='sticky'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
