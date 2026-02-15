import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header></Header>
      <main className="mx-auto mt-4 w-full max-w-4xl flex-1 px-6">
        <Outlet />
      </main>
    </div>
  )
}
