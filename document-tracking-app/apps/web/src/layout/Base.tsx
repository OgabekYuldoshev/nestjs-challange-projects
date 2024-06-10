import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Navbar } from '#/components/navbar'
import { useAuth } from '#/modules/auth/context/useAuth'

const Base = () => {
  const {store} = useAuth()
  
  if(!store.isAuthenticated){
    return <Navigate to="/auth/login"/>
  }

  return (
    <main className='w-full mx-auto'>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default Base