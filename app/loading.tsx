export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Loading Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-800 rounded-full animate-spin border-t-black dark:border-t-white mx-auto"></div>
          
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black dark:bg-white rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-6 space-y-2">
          <p className="text-lg font-medium text-black dark:text-white">
            Loading
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        
        {/* Optional: Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1">
            <div className="bg-black dark:bg-white h-1 rounded-full animate-pulse" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}