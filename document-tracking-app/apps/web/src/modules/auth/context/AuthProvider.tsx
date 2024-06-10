import { ReactNode } from 'react'

import { AuthContext } from './context'

const AuthProvider = ({children}:{children:ReactNode}) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
