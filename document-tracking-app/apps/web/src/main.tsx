import './assets/main.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import Splash from './components/splash.tsx'
import { Toaster } from "./components/ui/sonner"
import Providers from './Providers.tsx'
import { router } from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <Suspense fallback={<Splash/>}>
      <RouterProvider router={router} />
      </Suspense>
      <Toaster richColors position="top-right"/>
    </Providers>
  </React.StrictMode>,
)
