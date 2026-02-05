import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import DashboardPage from '@/pages/DashboardPage'
import ErrorPage from '@/pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    ErrorBoundary: ErrorPage,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      }
    ]
  }
])
