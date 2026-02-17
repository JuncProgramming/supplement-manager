import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import DashboardPage from '@/pages/DashboardPage'
import ErrorPage from '@/pages/ErrorPage'
import InventoryPage from './pages/InventoryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    ErrorBoundary: ErrorPage,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: '/inventory',
        element: <InventoryPage />
      }
    ]
  }
])
