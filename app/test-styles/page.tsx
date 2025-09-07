"use client"

export default function TestStylesPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Style Test</h1>
        <p className="text-gray-600 mb-4">
          If you can see this page styled properly with a blue background,
          white card, and proper typography, then Tailwind CSS is working.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Test Button
        </button>
      </div>
    </div>
  )
}