import React from 'react'
import { Outlet } from 'react-router-dom'

const Simple = () => {
  return (
    <main className='flex flex-col items-center justify-center h-full min-h-screen'><Outlet /></main>
  )
}

export default Simple