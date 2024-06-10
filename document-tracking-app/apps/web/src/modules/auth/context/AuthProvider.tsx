import { ReactNode, useEffect } from 'react'

import Splash from '#/components/splash'

import { useAuth } from './useAuth'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { refetch, isLoading, store } = useAuth()

  useEffect(() => refetch(), [])

  if(!store.isAuthenticated && isLoading){
    return <Splash/>
  }

  return children
}

export default AuthProvider
