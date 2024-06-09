import React from 'react'
import { Outlet } from 'react-router-dom'

import { Navbar } from '#/components/navbar'

const Base = () => {
  return (
    <main className='w-full max-w-screen-2xl mx-auto px-2.5'>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default Base