"use client"

import LesothoLoading from "./lesotho-loading"

interface LoadingPageProps {
  message?: string
  fullScreen?: boolean
}

export default function LoadingPage({ 
  message = "Loading...", 
  fullScreen = true 
}: LoadingPageProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <LesothoLoading size={120} showText={true} />
          <p className="mt-6 text-gray-600 font-medium animate-pulse">
            {message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <LesothoLoading size={100} showText={true} />
      <p className="text-gray-600 font-medium animate-pulse">
        {message}
      </p>
    </div>
  )
}