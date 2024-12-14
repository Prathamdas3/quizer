import { Link } from "react-router"

export default function NotFoundPage() {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
          <p className="mb-8">The page you are looking for does not exist.</p>
          <Link to="/" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            Go back to Home
          </Link>
        </div>
      </div>
    )
  }
  