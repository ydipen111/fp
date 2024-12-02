import { Button } from '@material-tailwind/react'
import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router'

export const RootLayout = () => {
  return (
    <div className='text-3xl font-bold'>
      <Header />
      <Outlet />
    </div>
  )
}
