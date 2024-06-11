import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Navbar } from '#/components/navbar'
import { useAuth } from '#/modules/auth/context/useAuth'

const Base = () => {
  const { store } = useAuth()

  if (!store.isAuthenticated) {
    return <Navigate to="/auth/login" />
  }

  return (
    <main className='w-full mx-auto'>
      <Navbar />
      <div className='max-w-screen-lg w-full mx-auto'>
        <Outlet />
      </div>
    </main>
  )
}

export default Base