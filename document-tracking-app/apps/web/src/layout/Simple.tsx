import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '#/modules/auth/context/useAuth'

const Simple = () => {
  const {store} = useAuth()
  
  if(store.isAuthenticated){
    return <Navigate to="/dashboard"/>
  }

  return (
    <main className='flex flex-col items-center justify-center h-full min-h-screen'><Outlet /></main>
  )
}

export default Simple