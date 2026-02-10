import Header from '@/components/Header'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="-mt-32 flex flex-1 flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-4xl font-bold text-zinc-800">Page not found</h1>
          <p className="text-zinc-600">Sorry, the page you're looking for doesn't exist</p>
        </div>
        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
