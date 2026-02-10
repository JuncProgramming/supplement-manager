import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import ErrorPage from '@/pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    ErrorBoundary: ErrorPage,
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  }
])
