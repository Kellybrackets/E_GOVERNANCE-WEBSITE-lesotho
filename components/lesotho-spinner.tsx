"use client"

import React from 'react'

interface LesothoSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LesothoSpinner({ 
  size = 'md', 
  className = "" 
}: LesothoSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const strokeWidth = {
    sm: '2',
    md: '2.5',
    lg: '3'
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        className={`${sizeClasses[size]} animate-spin`}
        viewBox="0 0 24 24"
        fill="none"
      >
        {/* Outer ring - Lesotho Blue */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          className="text-[#002F6C]/20"
        />
        
        {/* Animated arc - Lesotho Green */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeLinecap="round"
          strokeDasharray="15.708"
          strokeDashoffset="15.708"
          className="text-[#007849] animate-spin-reverse"
          style={{
            animation: 'lesotho-spinner 1.5s linear infinite'
          }}
        />
        
        {/* Central dot - Peace symbol */}
        <circle
          cx="12"
          cy="12"
          r="2"
          fill="currentColor"
          className="text-[#002F6C] opacity-60 animate-pulse"
        />
      </svg>
      
      <style jsx>{`
        @keyframes lesotho-spinner {
          0% {
            stroke-dasharray: 0 31.416;
          }
          50% {
            stroke-dasharray: 15.708 15.708;
          }
          100% {
            stroke-dasharray: 31.416 0;
          }
        }
      `}</style>
    </div>
  )
}