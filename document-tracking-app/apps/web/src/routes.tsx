import { createBrowserRouter, Navigate } from "react-router-dom";

import Base from "./layout/Base";
import Simple from "./layout/Simple";

export const router = createBrowserRouter([
  {
    path: 'dashboard',
    element: <Base />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { DashboardPage } = await import("./pages/Dashboard")
          return { Component: DashboardPage }
        }
      }
    ]
  },
  {
    path: 'auth',
    element: <Simple />,
    children: [
      {
        path: "login",
        lazy: async () => {
          const { LoginPage } = await import("./pages/Auth")
          return { Component: LoginPage }
        }
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" />,
  }
])