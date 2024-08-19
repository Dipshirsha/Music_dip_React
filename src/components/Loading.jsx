import React from 'react'


export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
    <div className="flex space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-8 h-8 bg-red-600 rounded-full animate-bounce"></div>
      <div className="w-8 h-8 bg-yellow-600 rounded-full animate-bounce"></div>
    </div>
  </div>
  )
}
