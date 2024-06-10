import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from "./components/ui/sonner"
import Providers from './Providers.tsx'
import { router } from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right"/>
    </Providers>
  </React.StrictMode>,
)
