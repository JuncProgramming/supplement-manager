import Header from '@/components/Header'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="-mt-32 flex flex-1 flex-col items-center justify-center px-6 sm:px-8">
        <h1 className="mb-1 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
          Page not found
        </h1>
        <p className="mb-3 text-center text-gray-600">
          Sorry, the page you're looking for doesn't exist
        </p>
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
