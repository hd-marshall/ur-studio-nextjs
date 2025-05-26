import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50">
      <div className="text-center max-w-md px-6">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-8xl font-bold text-black dark:text-white opacity-20 select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 border-2 border-black dark:border-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-400 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="block w-full px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
        
        {/* Optional: Animated dots for consistency with loading page */}
        <div className="flex justify-center space-x-1 mt-8">
          <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce opacity-40"></div>
          <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}