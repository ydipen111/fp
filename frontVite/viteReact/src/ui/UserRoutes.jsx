import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

export const UserRoutes = () => {
  const { user } = useSelector((state) => state.userSlice)
  return user ? <Navigate to="/" state={{ from: location }} /> : <Outlet />

}
